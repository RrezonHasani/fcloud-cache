import { ICache } from "../model";

export interface IUpdateCache {
  value: string;
  lastUsed: Date;
}

export default () => {
  return async (entity: ICache, data: IUpdateCache): Promise<ICache> => {
    if (!data) {
      console.log(`could not update cache`);
    }
    entity.set("value", data.value);
    entity.set("lastUsed", new Date());
    entity.save();
    return entity;
  };
};
