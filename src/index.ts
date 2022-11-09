import "./loadEnvironments.js";
import startServer from "./server/index.js";
import { port } from "./loadEnvironments.js";

await startServer(+port);
