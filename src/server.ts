import dotenv from "dotenv";
import app from "./app";
import Mongo from "./db/config";
import { logger } from "./utils/logger";

dotenv.config();

async function main() {
  await Mongo.connect(process.env.MONGODB_URI);
  app.listen(process.env.PORT, () => {
    logger.info(`Server running on port ${process.env.PORT}`);
  });
}

main();
