import { delay } from "../delay";
import { Game } from "../models/Game";
import { Ownership } from "../models/Ownership";
import { User } from "../models/User";

/* eslint-disable @typescript-eslint/no-var-requires */
const users: User[] = require("./users.json");
const ownerships: Ownership[] = require("./ownership.json");
const games: Game[] = require("./games.json");

export async function getUser(emailAddress: string): Promise<User | undefined> {
    await delay(300);

    const user = users.find(u => u.emailAddress === emailAddress);
    if (!user) {
        return Promise.resolve(undefined);
    }

    return Promise.resolve(user);
}

export async function getUserGames(user: User): Promise<Game[]> {
    await delay(300);

    const userOwnerships = ownerships.filter(o => o.userAccountId === user.userAccountId);
    if (userOwnerships.length === 0) {
        return [];
    }

    return games.filter(g => userOwnerships.some(o => o.gameId === g.gameId));
}
