import express from "express";
import cors from "cors";
import dns from "dns";
import passport from "passport";
import "dotenv/config";
import connectDB from "./config/MongoDB.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoute.js";
import { orderRouter } from "./routes/orderRoute.js";
import googleAuthRoutes from "./routes/googleRoute.js";

import "./config/passport.js";

const app = express();
const port = process.env.PORT || 5000;

connectDB();
connectCloudinary();
const corsOptions = {
  origin: true, 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(passport.initialize());
app.use("/auth", googleAuthRoutes);
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// ================= TEST =================

app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(port, () => console.log("server running on", port));