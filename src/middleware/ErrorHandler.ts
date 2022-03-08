/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import express from "express";

export function errorHandler(error: any, req: express.Request, res: express.Response): void {
    // set locals, only providing error in development
    res.locals.message = error.message;
    res.locals.error = req.app.get("env") === "development" ? error : {};

    // render the error page
    res.status(error.status || 500);
    res.send("error");
}
