import Item from "../../../database/models/Item";
import { getItems } from "./itemsController";
import type { Response, NextFunction } from "express";
import CustomError from "../../../CustomError/CustomError";
import { itemsMock } from "../../../mocks/userMock";

beforeEach(() => {
  jest.clearAllMocks();
});

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("Given a getItems Controller", () => {
  describe("When it receives a request with username 'panchito' and it finds a list of items", () => {
    test("Then it should call the response method status with a 200, and the json method", async () => {
      const expectedStatus = 200;

      Item.find = jest.fn().mockReturnValue(itemsMock);

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
      const next = jest.fn();

      const customError = new CustomError("", 500, "General error");

      Item.find = jest.fn().mockRejectedValue(Error(""));

      await getItems(null, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
