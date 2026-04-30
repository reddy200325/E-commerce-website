import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/MongoDB.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoute.js";
import { orderRouter } from "./routes/orderRoute.js";

const app = express();
const port = process.env.PORT || 5000;

connectDB();
connectCloudinary();

// middleware
app.use(express.json());
app.use(cors());

// api
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("Api working");
});

app.listen(port, () => console.log("server running", port));