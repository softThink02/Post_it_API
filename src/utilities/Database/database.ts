import mongoose, { Connection } from "mongoose";
import dotenv from "dotenv"

dotenv.config()

// Connecting to database handler
const connectDB = async (callback: () => void) => {
    console.log('connecting to DB...')
    mongoose.set('strictQuery', true);
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI!);
        connection && callback()
        console.log("Connected to DB")
    } catch (err) {
        throw err
        console.log(err)
    }
}

export default connectDB