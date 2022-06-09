import { logger } from "../../utils/logger";
import { Cache } from "../model";

export default () => {
  return async (key: string): Promise<boolean> => {
    const cache = await Cache.findOne({ key });
    if (!cache) {
      logger.info(`Not found cache by key: ${key}`);
      return false;
    }
    await cache.remove();
    logger.info(`Deleted cache by key: ${key}`);
    return true;
  };
};
