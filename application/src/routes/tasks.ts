import express from 'express';
import { promisePool } from '../libs/database';

async function list(req: express.Request, res: express.Response) {
    let answer = null;
    try {
        const [rows] = await promisePool.query('SELECT * FROM tasks WHERE user_id=?', [res.locals.user.userId]);
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

async function create(req: express.Request, res: express.Response) {
    let answer = null;
    try {
        const data = req.body;
        if (!/^[a-zA-Z0-9_\-]{1,30}$/.test(data.title)) throw `Title must be sent, received:${data.title}`;
        if (!/^[1-4]$/.test(data.status)) throw `Status must be a number between 1-4, received:${data.status}`;
        const [rows] = await promisePool.query('INSERT INTO tasks (title, description, status, user_id) VALUES (?, ?, ?, ?)', [data.title, data.description, data.status, res.locals.user.userId]) as any;
        answer = res.json({
            status: "success",
            id: rows.insertId,
        });
    } catch(error) {
        answer = res.status(401).json({
            status: "error",
            data: error,
        });
    }
    return answer;
}

async function update(req: express.Request, res: express.Response) {
    let answer = null;
    try {
        const data = req.body;
        if (!/^[0-9]{1,10}$/.test(data.id)) throw `Id must be sent, received:${data.id}`;
        if (!/^[1-4]$/.test(data.status)) throw `Status must be a number between 1-4, received:${data.status}`;
        await promisePool.query('UPDATE tasks SET status=? WHERE id=? AND user_id=?', [data.status, data.id, res.locals.user.userId]) as any;
        answer = res.json({
            status: "success",
        });
    } catch(error) {
        answer = res.status(401).json({
            status: "error",
            data: error,
        });
    }
    return answer;
}

export {
    list,
    create,
    update,
}