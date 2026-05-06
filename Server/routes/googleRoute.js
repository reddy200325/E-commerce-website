import express from "express";
import passport from "passport";
import { googleCallbackHandler } from "../middleware/googleAuth.js";

const router = express.Router();

// Start Google login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:3000/login",
  }),
  googleCallbackHandler
);

export default router;