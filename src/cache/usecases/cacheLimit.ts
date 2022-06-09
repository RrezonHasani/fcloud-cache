import crypto from "crypto";
import usecase from "./index";

const maxNumberOfEntries = process.env.MAX_CACHE_ENTRIES || 100;
const randomString = (): string => crypto.randomBytes(32).toString("hex");

export default () => {
  return async (): Promise<void> => {
    const payload = await usecase().getAll();
    if (payload.length < maxNumberOfEntries) return;
    const oldestCache = payload.sort((a, b) => a.get("lastUsed").getTime() - b.get("lastUsed").getTime())[0];
    await oldestCache.remove();
  };
};

export {
  randomString,
};
