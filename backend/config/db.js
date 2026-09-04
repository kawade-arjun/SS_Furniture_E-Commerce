import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function connectDB() {
  try {
    const connString = process.env.MONGODB_URI;
    if (!connString) {
      throw new Error('MONGODB_URI is not defined in environment variables. Please set your MongoDB Atlas cloud URI in .env');
    }
    console.log(`Connecting to Cloud MongoDB at: ${connString.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@')}...`);
    
    await mongoose.connect(connString);
    
    console.log('Cloud MongoDB connected successfully.');
  } catch (error) {
    console.error('MongoDB connection error:', error.message || error);
    process.exit(1);
  }
}

export default connectDB;
