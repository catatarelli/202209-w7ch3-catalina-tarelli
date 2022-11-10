import express from "express";
import multer from "multer";
import path from "path";
import {
  createItem,
  deleteItemById,
  getItems,
} from "../controllers/itemsController/itemsControllers.js";

const upload = multer({
  dest: path.join("assets", "images"),
});

// eslint-disable-next-line new-cap
const itemsRouter = express.Router();

itemsRouter.get("/list", getItems);
itemsRouter.post("/new-item", upload.single("picture"), createItem);
itemsRouter.delete("/delete-item", deleteItemById);

export default itemsRouter;
