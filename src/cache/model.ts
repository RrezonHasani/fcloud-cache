import { model, Schema, Document } from "mongoose";

export interface ICache extends Document {
  key: string;
  value: string;
  createdAt: Date;
  lastUsed: Date;
}

const ttl = process.env.TTL_IN_SECONDS || 60 * 60 * 24; // default is one day

const cacheSchema = new Schema<ICache>(
  {
    key: { type: String, required: true },
    value: { type: String, required: true },
    createdAt: { type: Date, expires: ttl, default: Date.now },
    lastUsed: { type: Date, expires: ttl, default: Date.now },
  },
  { collection: "cache" },
);

export const Cache = model<ICache>("Cache", cacheSchema);
