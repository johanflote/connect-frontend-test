import dotenv from "dotenv";
import { App } from "./App";
import { AuthenticationController } from "./controllers/AuthenticationController";
import { GamesController } from "./controllers/GamesController";

dotenv.config();

const port = process.env.PORT || "8081";
const app = new App([new AuthenticationController(), new GamesController()], parseInt(port, 10));
app.listen();

console.log(`-------------- server started on port: ${port} --------------`);
