import { logger } from "../../utils/logger";
import { Cache } from "../model";

export default () => {
  return async (): Promise<boolean> => {
    const data = await Cache.deleteMany({});
    if (!data) {
      logger.info(`caches deletion failed!`);
      return false;
    }
    logger.info("all caches deleted");
    return true;
  };
};
