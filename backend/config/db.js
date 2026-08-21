import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function connectDB() {
  try {
    const connString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ss_furniture';
    console.log(`Connecting to MongoDB at: ${connString}...`);
    
    await mongoose.connect(connString);
    
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

export default connectDB;
