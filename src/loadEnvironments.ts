import dotenv from "dotenv";

dotenv.config();

export const { PORT: port, MONGODB_URL: mongoUrl, DEBUG: debub } = process.env;
