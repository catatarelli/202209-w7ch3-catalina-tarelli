import "../../../loadEnvironments.js";
import CustomError from "../../../CustomError/CustomError.js";
import User from "../../../database/models/User.js";
import { secretWord } from "../../../loadEnvironments.js";
import { userMock, userMockWithId } from "../../../mocks/userMock.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { loginUser } from "./usersControllers.js";
import type { NextFunction, Request, Response } from "express";

beforeEach(() => {
  jest.clearAllMocks();
});

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn();

describe("Given a loginUser Controller", () => {
  const req: Partial<Request> = {
    body: userMock,
  };

  describe("When it receives a request with a username 'paquito' and password 'paquito' that are in the database", () => {
    test("Then it should call the response method status with a 200, and the json method with the token", async () => {
      const expectedStatus = 200;

      const token = jwt.sign(userMockWithId, secretWord);

      User.findOne = jest.fn().mockReturnValue(userMockWithId);
      bcrypt.compare = jest.fn().mockResolvedValueOnce(true);
      jwt.sign = jest.fn().mockReturnValueOnce(token);

      await loginUser(req as Request, res as Response, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });

  describe("When it receives username 'pepito' that is not in the database", () => {
    test("Then it should call next with a Custom Error with public message 'Wrong credentials'", async () => {
      User.findOne = jest.fn().mockReturnValue({});

      await loginUser(req as Request, res as Response, next as NextFunction);

      const newCustomError = new CustomError(
        "Password is incorrect",
        401,
        "Wrong credentials"
      );

      expect(next).toHaveBeenCalledWith(newCustomError);
    });
  });

  describe("When it receives a request with an empty body", () => {
    test("Then it should call next with a Custom Error with public message 'No data found'", async () => {
      User.findOne = jest.fn().mockReturnValue(null);

      const req: Partial<Request> = {
        body: {},
      };

      await loginUser(req as Request, res as Response, next as NextFunction);

      const noDataCustomError = new CustomError(
        "No data found",
        404,
        "No data found"
      );

      expect(next).toHaveBeenCalledWith(noDataCustomError);
    });
  });
});
