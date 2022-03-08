import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export function authenticate(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.TOKEN_SECRET as string, (err, user) => {
        if (err || !user) {
            return res.sendStatus(403);
        }

        req.user = user as User;

        next();
    });
}
