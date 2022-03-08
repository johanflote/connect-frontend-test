import { getMockReq, getMockRes } from "@jest-mock/express";
import { getUserGames } from "../data/database";
import { GamesController } from "./GamesController";

describe(GamesController.name, () => {
    const controller = new GamesController();

    const { res, clearMockRes } = getMockRes();

    beforeEach(() => {
        clearMockRes();
    });

    it("returns empty array if user has no ownerships", async () => {
        const req = getMockReq();
        req.user = {
            userAccountId: "--",
            firstName: "Louis",
            lastName: "Foster",
            emailAddress: "",
            password: "",
            isAdmin: false,
            dateOfBirth: "1998-03-27",
        };

        await controller.getMyGames(req, res);

        expect(res.json).toHaveBeenCalledWith([]);
    });

    it("returns array with expected data if a user has ownerships", async () => {
        const req = getMockReq();
        req.user = {
            userAccountId: "04399079-0aee-4448-adf7-0ca6ebf0f6a2",
            firstName: "Louis",
            lastName: "Foster",
            emailAddress: "louis.foster@baz.com",
            password: "qwerty",
            isAdmin: false,
            dateOfBirth: "1998-03-27",
        };

        const expected = await getUserGames(req.user);
        await controller.getMyGames(req, res);

        expect(res.json).toHaveBeenCalledWith(expected);
    });
});
