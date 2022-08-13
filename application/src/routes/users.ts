import express from 'express';
import { createToken } from '../libs/session';
import { promisePool } from '../libs/database';

async function list(req: express.Request, res: express.Response) {
    let answer = null;
    try {
        const [rows] = await promisePool.query('SELECT * FROM users');
        answer = res.json({
            status: "success",
            data: rows,
        });
    } catch(error) {
        answer = res.status(401).json({
            status: "error",
            data: error,
        });
    }
    return answer;
}

async function login(req: express.Request, res: express.Response) {
    let answer = null;
    try {
        const data = req.body;
        if (!/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)$/.test(data.email)) throw `Email must be sent, received:${data.email}`;
        const user = (await promisePool.query('SELECT * FROM users WHERE email=? AND password=?', [data.email, data.password]))[0] as any;
        if (user.length === 0) {
            answer = res.json({
                status: "error",
                data: "Incorrect login, please try again",
            });
        } else {
            const token = createToken(user[0]);
            answer = res.json({
                status: "success",
                token,
            });
        }
    } catch(error) {
        answer = res.status(401).json({
            status: "error",
            data: error,
        });
    }
    return answer;
}

export {
    login,
    list
}