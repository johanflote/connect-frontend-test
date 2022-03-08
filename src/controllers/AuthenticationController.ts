import express from "express";
import jwt from "jsonwebtoken";
import { getUser } from "../data/database";
import { User } from "../models/User";

import { Controller } from "./Controller";

export class AuthenticationController extends Controller {
    public readonly router = express.Router();
    protected readonly basePaths = ["/api"];

    constructor() {
        super();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.basePaths.forEach(basePath => {
            this.router.post(`${basePath}/v1/auth`, this.v1authenticate.bind(this));
        });
    }

    public async v1authenticate(req: express.Request, res: express.Response): Promise<void> {
        const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
        const [email, password] = Buffer.from(b64auth, "base64").toString().split(":");

        const user = await getUser(email);

        if (
            user &&
            email &&
            password &&
            email === user?.emailAddress &&
            password === user.password
        ) {
            const token = this.generateToken(user);
            res.json({ token });

            return;
        }

        res.status(401).send("Authentication failed.");
    }

    private generateToken(user: User): string {
        return jwt.sign(user, process.env.TOKEN_SECRET as string, { expiresIn: "3600s" });
    }
}
