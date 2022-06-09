import { Cache, ICache } from "../model";

export interface ICreateCache {
  key: string;
  value: string;
}

export default () => {
  return async (data: ICreateCache): Promise<ICache> => {
    const cache = await Cache.create(data);
    return cache;
  };
};
