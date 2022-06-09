import { ICache } from "../model";
import getByKey from "./getByKey";
import getAll from "./getAll";

export interface ICacheUseCase {
  getByKey(key: string): Promise<ICache>
  getAll(): Promise<ICache[]>
}

export default (): ICacheUseCase => ({
  getByKey: getByKey(),
  getAll: getAll(),
});
