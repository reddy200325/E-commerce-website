import express from "express";
import {
  registerUser,
  loginUser,
  adminLogin,
  sendOtp,
  verifyOtp,
  resetPassword,
} from "../controllers/userController.js";

import {
  getProfile,
  updateProfile,
} from "../controllers/profileController.js";

import { authUser } from '../middleware/auth.js'
import upload from '../middleware/multer.js';

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);

userRouter.post("/send-otp", sendOtp);
userRouter.post("/verify-otp", verifyOtp);
userRouter.post("/reset-password", resetPassword);

userRouter.get("/profile", authUser, getProfile);

userRouter.post(
  "/update-profile",
  authUser,
  upload.single("image"),
  updateProfile
);

export default userRouter;