import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "❌ Please define the MONGODB_URI environment variable in .env.local"
  );
}

let isConnected = false;
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectMongoDB = async () => {
  // Return cached connection if available
  if (cached.conn) return cached.conn;

  // Set Mongoose configurations
  mongoose.set("strictQuery", true);
  mongoose.set("strictPopulate", false);

  // If already connected via cached flag
  if (isConnected) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "test",
      bufferCommands: false,
      serverApi: { version: "1", strict: true, deprecationErrors: true },
    });
  }

  try {
    cached.conn = await cached.promise;
    isConnected = true;
    console.log("✅ MongoDB connected");
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.error("❌ MongoDB connection failed:", error);
    throw error;
  }
};

export default connectMongoDB;
