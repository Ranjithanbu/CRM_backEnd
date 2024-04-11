import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()
const mongoConnection=process.env.MONGOCONNECTION
export const connectDb=async()=>{
    try {
        await mongoose.connect(mongoConnection)
        console.log('DB CONNECTED SUCCESSFULLY');
    } catch (error) {
       console.log(error); 
    }
}