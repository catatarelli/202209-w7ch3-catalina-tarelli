import express from "express";
import { loginUser } from "../controllers/usersControllers/usersControllers";

// eslint-disable-next-line new-cap
const usersRouter = express.Router();

usersRouter.post("/register");
usersRouter.post("/login", loginUser);

export default usersRouter;
