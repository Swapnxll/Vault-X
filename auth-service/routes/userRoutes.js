import express from "express";
import { createUser, getUser } from "../controllers/authController.js";
const router = express.Router();

router.post("/create", createUser);
router.post("/get", getUser);
export default router;
