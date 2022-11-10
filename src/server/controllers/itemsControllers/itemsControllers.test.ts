import type { CustomRequest } from "../../../types/types";
import type { Response, NextFunction } from "express";
import { getItems } from "./itemsControllers";
import Item from "../../../database/models/Item";
import { itemsListMock } from "../../../mocks/userMock";

beforeEach(() => {
  jest.clearAllMocks();
});

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn();

describe("Given a getItems Controller", () => {
  describe("When it receives a request with an id 'abc123' of a user in the database", () => {
    const req: Partial<CustomRequest> = {
      userId: "abc123",
    };

    test("Then it should respond with response status 200, and a list of items with owner 'abc123'", async () => {
      const expectedStatus = 200;

      Item.find = jest.fn().mockReturnValue(itemsListMock);

      await getItems(req as CustomRequest, res as Response, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    describe("And there are no items in the database with that owner", () => {
      test("Then it should respond with response status 404, and the message 'No items found'", async () => {
        const expectedStatus = 404;

        Item.find = jest.fn().mockReturnValue([]);

        await getItems(
          req as CustomRequest,
          res as Response,
          next as NextFunction
        );

        expect(res.status).toHaveBeenCalledWith(expectedStatus);
      });
    });
  });
});
