import mongoose, { Mongoose } from 'mongoose';

const DB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!DB_URL) throw new Error('Missing Database URL!');
  cached.promise =
    cached.promise ||
    mongoose.connect(DB_URL, {
      dbName: 'mr-brain',
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
