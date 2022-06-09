import request from "supertest";
import app from "../../../app";
import mongo from "./mock-db";

describe("Cache Tests", () => {
  beforeAll(async () => {
    await mongo.connect();
  });

  afterAll(async () => {
    await mongo.disconnect();
  });

  it("should get all cache keys", async () => {
    const response = await request(app).get("/api/cache/keys");
    expect(response.status).toStrictEqual(200);
    expect(response.body.payload.length).toEqual(0);
  });

  it("should create cache by key: key1A", async () => {
    const response = await request(app)
      .post("/api/cache/key1A");
    expect(response.status).toStrictEqual(201);
    expect(response.body.message).toBe("Cache created");
  });

  it("should update cache by key: key1A", async () => {
    const response = await request(app)
      .post("/api/cache/key1A");
    expect(response.status).toStrictEqual(200);
    expect(response.body.message).toBe("Cache updated");
  });

  it("should get cache by key: key1A", async () => {
    const response = await request(app).get("/api/cache/key1A");
    expect(response.status).toStrictEqual(200);
    expect(response.body.message).toEqual("Cache found");
  });

  it("if cache not found should create cache by key: key2A", async () => {
    const response = await request(app).get("/api/cache/key2A");
    expect(response.status).toStrictEqual(201);
    expect(response.body.message).toEqual("Cache created!");
  });

  it("should delete cache by key: key1A", async () => {
    const response = await request(app).delete("/api/cache/key1A");
    expect(response.status).toStrictEqual(200);
    expect(response.body.message).toEqual(`Cache with key: key1A deleted`);
  });

  it("should delete all cache", async () => {
    const response = await request(app).delete("/api/cache/");
    expect(response.status).toStrictEqual(200);
    expect(response.body.message).toEqual(`all caches deleted`);
  });
});
