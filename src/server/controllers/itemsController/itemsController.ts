import type { NextFunction, RequestHandler, Response } from "express";
import fs from "fs/promises";
import path from "path";
import CustomError from "../../../CustomError/CustomError.js";
import Item from "../../../database/models/Item.js";
import type { CustomRequest, ItemId, ItemName } from "../../../types/types.js";

export const getItems = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req;

    const items = await Item.find({ owner: userId });

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

export const createItem: RequestHandler = async (req: CustomRequest, res) => {
  const { userId } = req;
  const { name } = req.body as ItemName;

  await fs.rename(
    path.join("assets", "images", req.file.filename),
    path.join("assets", "images", req.file.originalname)
  );

  const newItem = await Item.create({
    name,
    owner: userId,
    picture: req.file.originalname,
  });

  res.status(201).json({ item: newItem });
};

export const deleteItemById: RequestHandler = async (
  req: CustomRequest,
  res
) => {
  const { id } = req.body as ItemId;

  const item = await Item.findById(id);

  await fs.unlink(`assets/images/${item.picture}`);

  await Item.deleteOne({ id });

  res.status(200).json();
};
