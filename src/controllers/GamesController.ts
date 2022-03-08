import express from "express";
import { getUserGames } from "../data/database";

import { Controller } from "./Controller";

export class GamesController extends Controller {
    public readonly router = express.Router();
    protected readonly basePaths = ["/api"];

    constructor() {
        super();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.basePaths.forEach(path => {
            this.router.get(`${path}/v1/users/me/games`, this.getMyGames.bind(this));
        });
    }

    public async getMyGames(req: express.Request, res: express.Response): Promise<void> {
        const user = req.user;
        res.json(await getUserGames(user));
    }
}
