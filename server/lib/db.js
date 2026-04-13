import mongoose from "mongoose";

//Function to connect to the database

export const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/chat-app`);
        console.log('Database Connected');
    } catch (error) {
        console.error('Database connection failed:', error.message);
       
    }
}