import bcrypt from "bcryptjs";
import CustomError from "../../../CustomError/CustomError.js";
import type {
  RegisterData,
  UserCredentials,
  UserTokenPayload,
} from "../../../types/types";
import User from "../../../database/models/User.js";
import { secretWord } from "../../../loadEnvironments.js";
import jwt from "jsonwebtoken";
import type { NextFunction, Response, Request } from "express";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body as UserCredentials;
  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    const error = new CustomError(
      "Wrong credentials",
      401,
      "Wrong credentials"
    );
    next(error);
    return;
  }

  const tokenPayload: UserTokenPayload = {
    id: user._id.toString(),
    username,
  };

  const token = jwt.sign(tokenPayload, secretWord, {
    expiresIn: "2d",
  });

  res.status(200).json({ token });
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password, email } = req.body as RegisterData;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
    });

    res.status(201).json({ user: { id: newUser._id, username, email } });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "General error"
    );
    next(customError);
  }
};
