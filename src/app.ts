import express from "express";
import cacheRouter from "./cache/route";

const app = express();

app.use(express.json());
app.use("/api/cache", cacheRouter);

export default app;
