import mongoose from "mongoose";

const connectDataBase = async () => {
  mongoose
    .connect(process.env.MONGODB_SERVER_PORT)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));
};

export default connectDataBase;
