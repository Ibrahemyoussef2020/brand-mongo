import mongoose from 'mongoose'

async function dbConnect() {
  try {
    // Skip database connection only during build time to prevent failures
    if (process.env.BUILD_TIME === 'true') {
      console.log('Skipping database connection during build');
      return;
    }
    
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    await mongoose.connect(process.env.MONGODB_URI)
  } catch (error: any) {
    console.error('Mongoose connection error:', error);
    // During build, don't throw - just log and continue
    if (process.env.BUILD_TIME === 'true') {
      console.log('Database connection failed during build - continuing');
      return;
    }
    throw new Error(`Connection failed: ${error.message || error}`);
  }
}

export default dbConnect