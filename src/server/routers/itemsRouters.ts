import express from "express";
import { getItems } from "../controllers/itemsController/itemsController.js";

// eslint-disable-next-line new-cap
const itemsRouter = express.Router();

itemsRouter.get("/list", getItems);

export default itemsRouter;
