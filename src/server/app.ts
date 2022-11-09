import express from "express";
import morgan from "morgan";
import { generalError, unknownEndpoint } from "./errors/errors.js";
import itemsRouter from "./routers/itemsRouters.js";
import usersRouter from "./routers/usersRouters.js";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/users", usersRouter);
app.use("/items", itemsRouter);

app.use(unknownEndpoint);
app.use(generalError);

export default app;
