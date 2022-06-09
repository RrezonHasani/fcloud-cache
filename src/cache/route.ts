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

export default router;
