import mongoose from 'mongoose';

// Track the cached connection globally in development
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  // Skip database connection only during build time to prevent failures
  if (process.env.BUILD_TIME === 'true') {
    console.log('Skipping database connection during build');
    return null;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  try {
    if (!cached.promise) {
      console.log('Initializing new MongoDB Connection Pool...');
      cached.promise = mongoose.connect(process.env.MONGODB_URI, {
        bufferCommands: false,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000, // Fail fast to avoid 10s hanging waits
      }).then((mongoose) => {
        return mongoose;
      });
    }
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error: any) {
    cached.promise = null; // Reset promise so it tries again cleanly
    console.error('Mongoose connection error:', error);
    // During build, don't throw - just log and continue
    if (process.env.BUILD_TIME === 'true') {
      console.log('Database connection failed during build - continuing');
      return null;
    }
    throw new Error(`Connection failed: ${error.message || error}`);
  }
}

export default dbConnect;