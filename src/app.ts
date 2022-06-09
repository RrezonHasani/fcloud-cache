import express from "express";
import cacheRouter from "./cache/route";
import { errorHandler } from "./utils/error-handler";

const app = express();

app.use(express.json());
app.use("/api/cache", cacheRouter);
app.use(errorHandler);

export default app;
