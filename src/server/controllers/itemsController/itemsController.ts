import type { NextFunction, Request, Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import Item from "../../../database/models/Item.js";

export const getItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const items = await Item.find();

    if (!items?.length) {
      res.status(404).json({ message: "No items found." });
      return;
    }

    res.status(200).json({ items });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Database doesn't work, try again later"
    );
    next(customError);
  }
};
