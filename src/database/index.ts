import chalk from "chalk";
import mongoose from "mongoose";
import debugCreator from "debug";

const debug = debugCreator("Robots:database:root");

const connectDatabase = async (mongoUrl: string) => {
  try {
    await mongoose.connect(mongoUrl, { dbName: "w7ch2" });
    debug(chalk.blue("Connected to database"));
  } catch (error: unknown) {
    debug(chalk.red(`Error on connection`, (error as Error).message));
  }

  mongoose.set("toJSON", {
    virtuals: true,
    transform(doc, ret) {
      delete ret._id;
      delete ret.__v;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return ret;
    },
  });
};

export default connectDatabase;
