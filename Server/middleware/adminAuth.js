import jwt from "jsonwebtoken";

export const adminAuth = (req, res, next) => {
  try {
    const token = req.headers.token;

    // Check token existence
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request
    req.user = { id: decoded.id };

    next();
  } catch (err) {
    res
      .status(401)
      .json({ success: false, message: "Invalid token" });
  }
};