import { config } from "dotenv";
import mongoose from "mongoose";

config();

const connectDb = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Successfully connected to ${conn.connection.host}`);
    } catch (error) {
        console.log("MongoDB not connected. Error: ", error.messsage);
        process.exit();
    }
}

export default connectDb;