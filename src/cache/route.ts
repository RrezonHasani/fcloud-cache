import {
  NextFunction, Router, Request, Response,
} from "express";
import { logger } from "../utils/logger";
import usecase from "./usecases";

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
        await usecase().update(data, {
          value: data.value,
          lastUsed: new Date(),
        });
        return res.status(200).json({
          payload: data.get("value"),
          message,
        });
      }
      logger.info("Cache miss");
      data = await usecase().create({
        key,
        value: "1",
      });
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

export default router;
