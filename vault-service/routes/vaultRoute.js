import express from "express";
import { checkKey, createkey } from "../controllers/vaultController.js";

const router = express.Router();

router.post("/create", createkey);
router.post("/check", checkKey);

export default router;
