import mongoose from 'mongoose'

async function dbConnect() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    await mongoose.connect(process.env.MONGODB_URI)
  } catch (error: any) {
    console.error('Mongoose connection error:', error);
    throw new Error(`Connection failed: ${error.message || error}`);
  }
}

export default dbConnect