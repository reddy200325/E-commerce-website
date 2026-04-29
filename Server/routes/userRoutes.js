import express from  "express"
import { registerUser, loginUser,adminLogin } from "../controllers/userController.js"
import {
  sendOtp,
  verifyOtp,
  resetPassword,
} from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
userRouter.post("/send-otp", sendOtp);
userRouter.post("/verify-otp", verifyOtp);
userRouter.post("/reset-password", resetPassword);

export default userRouter