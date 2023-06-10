import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

function connectToDB() {
  return mongoose.connect(process.env.DATABASE_URI);
}

export { connectToDB };
