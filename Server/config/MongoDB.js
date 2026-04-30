import mongoose from "mongoose";

// Initialize MongoDB connection
const connectDB = () => {
  mongoose.connect(`${process.env.MONGODB_URI}/ecommerce`);
};

export default connectDB;