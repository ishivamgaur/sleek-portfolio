import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

async function testConnection() {
  console.log("Connecting to:", MONGODB_URI);
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("SUCCESS!");
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("Collections:", collections.map(c => c.name));
    process.exit(0);
  } catch (error) {
    console.error("FAILED TO CONNECT:", error.message);
    process.exit(1);
  }
}

testConnection();
