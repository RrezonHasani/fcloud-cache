import { ICache } from "../model";
import getByKey from "./getByKey";

export interface ICacheUseCase {
  getByKey(key: string): Promise<ICache>
}

export default (): ICacheUseCase => ({
  getByKey: getByKey(),
});
