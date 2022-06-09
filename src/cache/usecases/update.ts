import { logger } from "../../utils/logger";
import { ICache } from "../model";

export interface IUpdateCache {
  value: string;
  lastUsed: Date;
}

export default () => {
  return async (entity: ICache, data: IUpdateCache): Promise<ICache> => {
    if (!data) {
      logger.info(`could not update cache`);
    }
    entity.set("value", data.value);
    entity.set("lastUsed", new Date());
    entity.save();
    return entity;
  };
};
