import jwt from "jsonwebtoken";

export const adminAuth = (req, res, next) => {
  try {
    console.log("HEADERS:", req.headers);

    const token = req.headers.token;
    console.log("TOKEN RECEIVED:", token);

    if (!token) {
      return res.status(401).json({ success: false, message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED:", decoded);

    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};