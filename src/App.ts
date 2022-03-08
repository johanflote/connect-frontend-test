import cors from "cors";
import express from "express";
import compression from "compression";
import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";

import { Controller } from "./controllers/Controller";
import { errorHandler } from "./middleware/ErrorHandler";
import { notFoundHandler } from "./middleware/NotFoundHandler";
import { unless } from "./middleware/Unless";
import { authenticate } from "./middleware/JwtAuthentication";

export class App {
    public readonly expressApp: express.Application;

    constructor(private readonly _controllers: Controller[], private readonly _port: number) {
        this.expressApp = express();
        this.expressApp.disable("x-powered-by");

        this.initializeMiddleware();
        this.registerAuthHandler();
        this.initializeControllers();
        this.registerNotFoundHandler();
        this.registerErrorHandler();
    }

    public listen(): void {
        this.expressApp.listen(this._port, () => {
            `App listening on port ${this._port}`;
        });
    }

    private initializeMiddleware(): void {
        this.expressApp.use(express.json());
        this.expressApp.use(compression());
        this.expressApp.use(cors({
            allowedHeaders: "*",
            credentials: true,
            origin: "*",
            methods: "*"
        }));
    }

    private initializeControllers(): void {
        this._controllers.forEach(controller => {
            this.expressApp.use("/", controller.router);
        });

        const swaggerDocument = yaml.load("./src/docs/swagger.yml");
        this.expressApp.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }

    private registerNotFoundHandler(): void {
        this.expressApp.use(notFoundHandler);
    }

    private registerErrorHandler(): void {
        this.expressApp.use(errorHandler);
    }

    private registerAuthHandler(): void {
        this.expressApp.use(unless(["/api-docs/", "/api/v1/auth"], authenticate));
    }
}
