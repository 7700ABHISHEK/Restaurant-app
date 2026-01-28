import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const connectDB = async () => {
    const MONGO_URI = process.env.MONGO_URI;

    mongoose.connection.on("connected", () => {
        console.log('Database connected successfully');
    })

    await mongoose.connect(MONGO_URI)
}

export default connectDB;