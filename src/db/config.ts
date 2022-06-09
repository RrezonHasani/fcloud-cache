import mongoose from "mongoose";
import { logger } from "../utils/logger";

export default class Mongo {
  static connection: mongoose.Mongoose;

  static async connect(connectionString: string): Promise<void> {
    logger.info("Mongo db connecting...");
    try {
      this.connection = await mongoose.connect(connectionString);
    } catch (err) {
      logger.info(`Error Connection to Mongo: ${err}`);
    }
    logger.info("Mongo db connected");
    mongoose.connection.on("error", (err) => {
      logger.info(`Error Connection to Mongo: ${err}`);
    });
    mongoose.connection.on("disconnected", () => {
      logger.info("Disconnecting to mongo: ");
    });
    mongoose.connection.on("reconnected", () => {
      logger.info("Reconnect to mongo");
    });
  }

  static getConnection(): mongoose.Mongoose {
    return this.connection;
  }
}
