import "./loadEnvironments.js";
import startServer from "./server/index.js";
import { port, mongoUrl } from "./loadEnvironments.js";
import connectDatabase from "./database/index.js";

await startServer(+port);
await connectDatabase(mongoUrl);
