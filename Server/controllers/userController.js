// Main Auth Controller (User Login, Register, Admin Login, Token)

import validator from "validator";
import userModel from "../models/userModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateOTP } from "../utils/generateOTP.js";
import { saveOTP,verifyOTP } from "../utils/otpStore.js";
import { sendOTP } from "../utils/sendOTP.js";

export const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};
let otpStore = {};
// SEND OTP
export const sendOtp = async (req, res) => {
  try {
    const { email, type } = req.body;

    const user = await userModel.findOne({ email });

    // SIGN UP
    if (type === "signup" && user) {
      return res.json({
        success: false,
        message: "User already exist",
      });
    }

    // FORGOT PASSWORD
    if (type === "reset" && !user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const otp = generateOTP();

    otpStore[email] = otp;

    await sendOTP(email, otp);

    res.json({
      success: true,
      message: "OTP sent",
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// VERIFY OTP
export const verifyOtp = (req, res) => {
  const { email, otp } = req.body;

  // check OTP
  if (otpStore[email] === otp) {
    delete otpStore[email]; // remove after success

    return res.json({
      success: true,
      message: "OTP verified successfully",
    });
  }

  return res.json({
    success: false,
    message: "Invalid OTP",
  });
};

// RESET PASSWORD
export const resetPassword = async (req, res) => {
  const user = await userModel.findOne({ email });

if (!user) {
  return res.json({ success: false, message: "User not found" });
}
  const { email, newPassword } = req.body;

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await userModel.findOneAndUpdate(
    { email },
    { password: hashedPassword }
  );

   delete otpStore[email];

  res.json({ success: true, message: "Password updated" });
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user " });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, message: "Login successful", token });
    } else {
      res.json({ success: false, message: "Incorrect password" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exist = await userModel.findOne({ email });

    if (exist) {
      return res
        .status(400)
        .json({ success: false, message: "User already exist" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email address" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Please enter strong password",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({
      success: true,
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);

      res.json({ success: true, token });
    } else {
      res.json({
        success: false,
        message: "Invalid admin credentials",
      });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};