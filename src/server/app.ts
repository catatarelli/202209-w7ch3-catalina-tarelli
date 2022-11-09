import express from "express";
import morgan from "morgan";
import { generalError, notFoundPage } from "./errors/errors.js";
import usersRouter from "./routers/usersRouters.js";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/users", usersRouter);

app.use(notFoundPage);
app.use(generalError);

export default app;
