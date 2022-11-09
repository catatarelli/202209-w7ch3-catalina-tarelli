import express from "express";
import morgan from "morgan";
import { auth } from "./middlewares/auth/auth.js";
import { generalError, unknownEndpoint } from "./middlewares/errors/errors.js";
import itemsRouter from "./routers/itemsRouters.js";
import usersRouter from "./routers/usersRouters.js";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/users", usersRouter);
app.use("/items", auth, itemsRouter);

app.use(unknownEndpoint);
app.use(generalError);

export default app;
