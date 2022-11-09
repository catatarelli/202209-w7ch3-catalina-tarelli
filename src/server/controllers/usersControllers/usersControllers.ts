import bcrypt from "bcryptjs";
import CustomError from "../../../CustomError/CustomError";
import type { UserCredentials, UserTokenPayload } from "../../../types/types";
import User from "../../../database/models/User";
import { secretWord } from "../../../loadEnvironments";
import jwt from "jsonwebtoken";
import type { NextFunction, Response, Request } from "express";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body as UserCredentials;
  const user = await User.findOne({ username });

  if (!user) {
    const error = new CustomError("No data found", 404, "No data found");

    next(error);
    return;
  }

  if (!(await bcrypt.compare(password, user.password))) {
    const error = new CustomError(
      "Password is incorrect",
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
