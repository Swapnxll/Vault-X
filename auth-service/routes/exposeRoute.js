import express from "express";
import rateLimit from "express-rate-limit";
import { checkbreach } from "../controllers/exposeController.js";

const router = express.Router();

const checkLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per minute
  message: {
    error: "Too many requests. Please try again after a minute.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.get("/check", checkLimiter, (req, res) => {
  res.json({ message: "hello" });
});

export default router;
