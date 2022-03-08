import express from "express";
import { HeaderResult } from "../models/HeaderResult";

export abstract class Controller {
    public abstract readonly router: express.IRouter;
    protected abstract readonly basePaths: string[];

    public getHeader<T extends string>(
        request: express.Request,
        headerName: string,
        headerIsRequired = false,
        response?: express.Response
    ): HeaderResult<T> {
        if (headerIsRequired && !request.header(headerName)) {
            if (response) {
                const message = `Required header ${headerName} missing.`;
                response.status(400).send(message);
            }

            return { success: false, value: undefined };
        }

        return { success: true, value: Controller.getHeaderValue(request, headerName) };
    }

    private static getHeaderValue<T extends string>(
        request: express.Request,
        headerName: string
    ): T | undefined {
        const headerValue = request.header(headerName);
        return headerValue != null ? (headerValue as T) : undefined;
    }
}
