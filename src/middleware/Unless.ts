import express from "express";

export function unless(
    paths: string[],
    middleware: express.RequestHandler
): express.RequestHandler {
    return function (req, res, next) {
        if (paths.some(path => req.path.startsWith(path))) {
            return next();
        } else {
            return middleware(req, res, next);
        }
    };
}
