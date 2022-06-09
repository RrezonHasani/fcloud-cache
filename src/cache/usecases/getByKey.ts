import { Cache, ICache } from "../model";

export default () => {
  return async (key: string): Promise<ICache> => {
    const cache = await Cache.findOne({ key });
    if (!cache) {
      console.log(`could not found cache with key: ${key}`);
    }
    return cache;
  };
};
