// lib/mongodb.ts
import mongoose from "mongoose";
import { logger } from "../logger";

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

type CachedMongoose = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

let globalWithMongoose = global as typeof globalThis & {
  _mongooseClient?: CachedMongoose;
};

if (!globalWithMongoose._mongooseClient) {
  globalWithMongoose._mongooseClient = { conn: null, promise: null };
}

const cached = globalWithMongoose._mongooseClient;

export async function connectedToMongodb(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  try {
    if (!cached.promise) {
      cached.promise = mongoose.connect(MONGODB_URI, {
        bufferCommands: false,
        dbName: "your-db-name", // optional
      });
    }

    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    logger.error("MongoDB connection failed:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}
