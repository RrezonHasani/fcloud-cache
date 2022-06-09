import { ICache } from "../model";
import getByKey from "./getByKey";
import getAll from "./getAll";
import create, { ICreateCache } from "./create";
import update, { IUpdateCache } from "./update";
import deleteByKey from "./deleteByKey";

export interface ICacheUseCase {
  getByKey(key: string): Promise<ICache>
  getAll(): Promise<ICache[]>
  create(data: ICreateCache): Promise<ICache>
  update(entity: ICache, data: IUpdateCache): Promise<ICache>
  deleteByKey(key: string): Promise<boolean>
}

export default (): ICacheUseCase => ({
  getByKey: getByKey(),
  getAll: getAll(),
  create: create(),
  update: update(),
  deleteByKey: deleteByKey(),
});
