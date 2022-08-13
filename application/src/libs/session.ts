import express from 'express';
import jwt from 'jsonwebtoken';

const secretKey = "interview";
const headerKey = "auth";

function createToken(user: any) {
    const userData = {
        time: Date(),
        userId: user.id,
    }
    return jwt.sign(userData, secretKey as string, {
        expiresIn: "2h"
    });
}

function verifyToken(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const token = req.header(headerKey) as string;
        const verify = jwt.verify(token, secretKey);
        if (verify) {
            res.locals.user = verify;
            next();
        }
    } catch (error) {
        return res.status(401).json({
            status: "error",
            data: error,
        });
    }
}

export {
    createToken,
    verifyToken
}