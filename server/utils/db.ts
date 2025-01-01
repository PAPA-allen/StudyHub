import mongoose from 'mongoose';
import "dotenv/config";

const DB_URL = process.env.MONGODB_URL || ''

const connectDB = async () => {
  try {
      await mongoose.connect(DB_URL).then((data: any) => {
          console.log(`database connect with ${data.connection.host}`);
      })
  } catch (error:any) {
      console.log(error.message)
      setTimeout(connectDB, 5000)
  }
}

export default connectDB;