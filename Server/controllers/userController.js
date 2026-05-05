import validator from "validator";
import userModel from "../models/userModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateOTP } from "../utils/generateOTP.js";
import { sendOtpEmail } from "../utils/sendEmail.js";

// ================= GENERATE JWT TOKEN =================
export const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ================= TEMP OTP STORE =================
let otpStore = {};

// ================= SEND OTP =================
export const sendOtp = async (req, res) => {
  try {
    const { email, type } = req.body;

    const user = await userModel.findOne({ email });

    // Validation
    if (type === "signup" && user) {
      return res.json({ success: false, message: "User already exists" });
    }

    if (type === "reset" && !user) {
      return res.json({ success: false, message: "User not found" });
    }

    const otp = generateOTP();

    // Save OTP
    otpStore[email] = {
      otp,
      expires: Date.now() + 5 * 60 * 1000, // 5 minutes
    };

    // Send email using Resend
    await sendOtpEmail(email, otp);

    return res.json({ success: true, message: "OTP sent successfully" });

  } catch (error) {
    console.error("OTP ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
};

// ================= VERIFY OTP =================
export const verifyOtp = (req, res) => {
  const { email, otp } = req.body;

  const record = otpStore[email];

  if (!record) {
    return res.json({ success: false, message: "No OTP found" });
  }

  if (Date.now() > record.expires) {
    delete otpStore[email];
    return res.json({ success: false, message: "OTP expired" });
  }

  if (record.otp === otp) {
    delete otpStore[email];
    return res.json({
      success: true,
      message: "OTP verified successfully",
    });
  }

  return res.json({ success: false, message: "Invalid OTP" });
};

// ================= RESET PASSWORD =================
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await userModel.findOneAndUpdate(
      { email },
      { password: hashedPassword }
    );

    delete otpStore[email];

    res.json({ success: true, message: "Password updated" });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= USER LOGIN =================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid user",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      return res.json({
        success: true,
        message: "Login successful",
        token,
      });
    } else {
      return res.json({
        success: false,
        message: "Incorrect password",
      });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= USER REGISTER =================
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exist = await userModel.findOne({ email });

    if (exist) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Weak password",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({
      success: true,
      message: "User registered",
      token,
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= ADMIN LOGIN =================
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);

      return res.json({ success: true, token });
    } else {
      return res.json({
        success: false,
        message: "Invalid admin credentials",
      });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};