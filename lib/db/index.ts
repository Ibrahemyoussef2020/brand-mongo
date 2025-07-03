import mongoose from 'mongoose';

const cashed = (global as any).mongoose || {conn:null,promise:null};

export const connectToDatabase = async (MONGODB_URI = process.env.MONGODB_URI)=>{

    if (cashed.conn)  return cashed.conn

    if (!MONGODB_URI) throw new Error("MONGODB_URI is missing")

    cashed.promise = cashed.promise || mongoose.connect(MONGODB_URI);
    
    cashed.conn = await cashed.promise

    return cashed.conn
    
}