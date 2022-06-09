import { ICache } from "../model";
import getByKey from "./getByKey";
import getAll from "./getAll";
import create, { ICreateCache } from "./create";

export interface ICacheUseCase {
  getByKey(key: string): Promise<ICache>
  getAll(): Promise<ICache[]>
  create(data: ICreateCache): Promise<ICache>
}

export default (): ICacheUseCase => ({
  getByKey: getByKey(),
  getAll: getAll(),
  create: create(),
});
