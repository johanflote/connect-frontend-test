import { getMockReq, getMockRes } from "@jest-mock/express";
import { AuthenticationController } from "./AuthenticationController";

describe(AuthenticationController.name, () => {
    const controller = new AuthenticationController();

    const { res, clearMockRes } = getMockRes();

    beforeEach(() => {
        clearMockRes();
    });

    it("returns 401 if authentication header is missing", async () => {
        const req = getMockReq();
        await controller.v1authenticate(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
    });

    it("returns 401 if authentication header is malformed", async () => {
        const req = getMockReq();
        req.headers.authorization = "MALFORMED_HEADER";
        await controller.v1authenticate(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
    });

    it("returns 401 if user is not found", async () => {
        const req = getMockReq();
        req.headers.authorization = `Basic ${Buffer.from("user:pass").toString("base64")}`;
        await controller.v1authenticate(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
    });

    it("returns 401 if user is found and password is incorrect", async () => {
        const req = getMockReq();
        req.headers.authorization = `Basic ${Buffer.from("louis.foster@baz.com:pass").toString(
            "base64"
        )}`;
        await controller.v1authenticate(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
    });

    it("returns a jwt token if the user is found and password is correct", async () => {
        const req = getMockReq();
        req.headers.authorization = `Basic ${Buffer.from("louis.foster@baz.com:qwerty").toString(
            "base64"
        )}`;
        await controller.v1authenticate(req, res);

        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledTimes(1);
    });
});
