import Item from "../../../database/models/Item";
import { getRandomUsers } from "../../../mocks/factory";
import { getItems } from "./itemsController";
import type { Response, NextFunction, Request } from "express";
import CustomError from "../../../CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn().mockReturnThis();

describe("Given a getItems Controller", () => {
  describe("When it finds a list of items", () => {
    test("Then it should call the response method status with a 200, and the json method", async () => {
      const expectedStatus = 200;

      Item.find = jest.fn().mockReturnValue(getRandomUsers(3));

      await getItems(null, res as Response, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("When it receives an empty array", () => {
    test("Then it should call the response method status with a 404", async () => {
      const expectedStatus = 404;

      Item.find = jest.fn().mockReturnValue([]);

      await getItems(null, res as Response, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("When it receives a response with an error", () => {
    test("Then next should be called", async () => {
      const customError = new CustomError("", 500, "General error");

      Item.find = jest.fn().mockRejectedValue(Error(""));

      await getItems(null, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
