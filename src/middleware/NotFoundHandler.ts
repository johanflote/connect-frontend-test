import express from "express";

export function notFoundHandler(req: express.Request, res: express.Response): void {
    res.sendStatus(404);
}
