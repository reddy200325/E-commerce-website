import jwt from "jsonwebtoken";

export const googleCallbackHandler = (req, res) => {
  try {
    const user = req.user;

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // redirect to frontend with token
    res.redirect(`http://localhost:5173/google-success?token=${token}`);
  } catch (error) {
    res.redirect("http://localhost:3000/login");
  }
};