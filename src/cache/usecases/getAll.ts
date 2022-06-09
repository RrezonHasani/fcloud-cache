import { logger } from "../../utils/logger";
import { Cache, ICache } from "../model";

export default () => {
  return async (): Promise<ICache[]> => {
    const cache = await Cache.find({});
    if (!cache) {
      logger.info(`not found any cache`);
    }
    return cache;
  };
};
