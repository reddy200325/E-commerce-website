import transporter from "../config/mailer.js";


export const sendOTP = async (email, otp) => {
  
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "OTP Verification",
    text: `Your OTP is: ${otp} Valid for 5 minutes `,
  });
};