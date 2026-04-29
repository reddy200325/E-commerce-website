const otpStore = {};

export const saveOTP = (email, otp) => {
  otpStore[email] = {
    otp,
    expires: Date.now() + 5 * 60 * 1000, // 5 mins
  };
};

export const verifyOTP = (email, userOtp) => {
  const record = otpStore[email];

  if (!record) return false;
  if (record.expires < Date.now()) return false;

  return record.otp === userOtp;
};