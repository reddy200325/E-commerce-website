import nodemailer from "nodemailer";

// Configure email transporter using Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
   host: "stylewave360@gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default transporter;
