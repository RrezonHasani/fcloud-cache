import {
  NextFunction, Router, Request, Response,
} from "express";
import { logger } from "../utils/logger";
import usecase from "./usecases";
import { randomString } from "./usecases/cacheLimit";

const router = Router();

router.get(
  "/keys",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await usecase().getAll();
      logger.info("data", data);
      return res.status(200).json({
        payload: data.map((cache) => cache.get("key")),
        message: "Cache keys",
      });
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  "/:key",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { key } = req.params;
      let data = await usecase().getByKey(key);
      let message: string;
      if (data) {
        logger.info("Cache hit");
        message = "Cache found";
        await usecase().update(data, { value: data.value, lastUsed: new Date() });
        return res.status(200).json({
          payload: data.get("value"),
          message,
        });
      }
      logger.info("Cache miss");
      data = await usecase().create({ key, value: "1" });
      message = "Cache created!";
      await usecase().cacheLimit();
      return res.status(201).json({
        payload: data.get("value"),
        message,
      });
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/:key",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { key } = req.params;
      let data = await usecase().getByKey(key);
      let message: string;
      let statusCode: number;
      if (data) {
        logger.info("Cache updated");
        await usecase().update(data, { value: randomString(), lastUsed: new Date() });
        message = "Cache updated!";
        statusCode = 200;
      } else {
        logger.info("Cache created");
        data = await usecase().create({ key, value: randomString() });
        message = "Cache created!";
        statusCode = 201;
      }
      await usecase().cacheLimit();
      return res.status(statusCode).json({
        payload: data.get("value"),
        message,
      });
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/:key",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { key } = req.params;
      const data = await usecase().getByKey(key);
      if (data) {
        return res.status(404).json({
          message: "Cache not found!",
        });
      }
      const result = await usecase().deleteByKey(key);
      return res.status(200).json({
        message: `Cache with key: ${key} ${result ? "deleted" : "was not deleted!"}`,
      });
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await usecase().deleteAll();
      return res.status(200).json({ message: "all caches deleted" });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
