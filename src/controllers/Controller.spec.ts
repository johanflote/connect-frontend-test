import express from "express";
import { getMockReq, getMockRes } from "@jest-mock/express";
import { Controller } from "./Controller";

class TestController extends Controller {
    public readonly router: express.Router = express.Router();
    protected readonly basePaths = ["test"];

    constructor() {
        super();
    }

    public processRequest(
        req: express.Request,
        res: express.Response,
        headerToCheck: string,
        headerIsRequired = false,
        passResponse = true
    ): void {
        if (headerToCheck) {
            const headerResponse = this.getHeader(
                req,
                headerToCheck,
                headerIsRequired,
                passResponse ? res : undefined
            );

            if (headerIsRequired && !headerResponse.success && passResponse) {
                return;
            }

            res.status(200).json(headerResponse);
        }

        res.status(200).send();
    }
}

describe(Controller.name, () => {
    const controller = new TestController();

    describe("getHeader", () => {
        const { res, clearMockRes } = getMockRes();

        beforeEach(() => {
            clearMockRes();
        });

        it("Returns the header value of the specified header if set in the request", () => {
            const expected = "test";
            const headerName = "Ubi-Header";

            const req = getMockReq();
            const headerMockFunction = req.header as jest.Mock;
            headerMockFunction.mockReturnValue(expected);

            controller.processRequest(req, res, headerName);

            expect(headerMockFunction).toHaveBeenCalledWith(headerName);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    success: true,
                    value: expected,
                })
            );
        });

        it("Returns the value as undefined if the specified header is not set in the request", () => {
            const headerName = "Ubi-Header";

            const req = getMockReq();
            const headerMockFunction = req.header as jest.Mock;

            controller.processRequest(req, res, headerName);

            expect(headerMockFunction).toHaveBeenCalledWith(headerName);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    success: true,
                    value: undefined,
                })
            );
        });

        it("Sends a 400 response if a required header is not set and response is passed", () => {
            const headerName = "Ubi-Required-Header";

            const req = getMockReq();
            const headerMockFunction = req.header as jest.Mock;

            controller.processRequest(req, res, headerName, true);

            expect(headerMockFunction).toHaveBeenCalledWith(headerName);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).not.toHaveBeenCalled();
        });

        it("Returns a HeadersResult with success: false if a required header is missing and no response is passed", () => {
            const headerName = "Ubi-Required-Header";

            const req = getMockReq();
            const headerMockFunction = req.header as jest.Mock;

            controller.processRequest(req, res, headerName, true, false);

            expect(headerMockFunction).toHaveBeenCalledWith(headerName);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    success: false,
                    value: undefined,
                })
            );
        });
    });
});
