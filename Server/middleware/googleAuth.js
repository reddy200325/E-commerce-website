import jwt from "jsonwebtoken";

export const googleCallbackHandler = (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.redirect(`${process.env.CLIENT_URL}/login`);
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.redirect(`${process.env.CLIENT_URL}/google-success?token=${token}`);
  } catch (error) {
    res.redirect(`${process.env.CLIENT_URL}/login`);
  }
};