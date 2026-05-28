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
    if (process.env.NODE_ENV === 'development') {
      console.warn('MONGODB_URI is not defined — skipping DB connection in development');
      // Ensure mongoose will buffer commands until a connection is established
      mongoose.set('bufferCommands', true);
      return null;
    }
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  try {
    if (!cached.promise) {
      console.log('Initializing new MongoDB Connection Pool...');
      // Prefer direct connection URI if provided to avoid SRV DNS issues
      if (process.env.MONGODB_URI_DIRECT) {
        const directUriMasked = process.env.MONGODB_URI_DIRECT.replace(/:[^@]+@/, ':***@');
        console.log(`Using direct MongoDB URI (masked): ${directUriMasked}`);
        cached.promise = mongoose.connect(process.env.MONGODB_URI_DIRECT, {
          bufferCommands: true,
          maxPoolSize: 10,
          serverSelectionTimeoutMS: 15000,
        }).then(() => {
          console.log('✓ MongoDB connected successfully via direct connection');
          return mongoose;
        }).catch((directError: any) => {
          console.error('Direct connection failed:', directError.message);
          throw directError;
        });
      } else {
        // Fallback to SRV connection
        const uriMasked = process.env.MONGODB_URI?.replace(/:[^@]+@/, ':***@') || 'MISSING';
        console.log(`Connection URI (masked): ${uriMasked}`);
        console.log('Server Selection Timeout: 5000ms, Buffer Commands: true');
        cached.promise = mongoose.connect(process.env.MONGODB_URI, {
          bufferCommands: true,
          maxPoolSize: 10,
          serverSelectionTimeoutMS: 5000,
        }).then(() => {
          console.log('✓ MongoDB connected successfully via SRV');
          return mongoose;
        }).catch((srvError: any) => {
          console.error('SRV connection failed:', srvError.message);
          throw srvError;
        });
      }
    }
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error: any) {
    cached.promise = null; // Reset promise so it tries again cleanly
    console.error('Mongoose connection error:', {
      message: error.message,
      code: error.code,
      syscall: error.syscall,
      hostname: error.hostname,
      fullError: error.toString(),
    });
    // During build or local development, don't throw - just log and continue
    if (process.env.BUILD_TIME === 'true' || process.env.NODE_ENV === 'development') {
      console.warn('Database connection failed (non-fatal in development/build):', error.message || error);
      return null;
    }
    throw new Error(`Connection failed: ${error.message || error}`);
  }
}

export default dbConnect;