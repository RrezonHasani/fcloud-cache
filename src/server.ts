import dotenv from "dotenv";
import app from "./app";
import { logger } from "./utils/logger";

dotenv.config();

async function main() {
  app.listen(process.env.PORT, () => {
    logger.info(`Server running on port ${process.env.PORT}`);
  });
}

main();
