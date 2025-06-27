import express from "express";
import {
  addpass,
  checkKey,
  createkey,
  fetchAllPasswords,
  fetchPasswordBySite,
} from "../controllers/vaultController.js";

const router = express.Router();

router.post("/create", createkey);
router.post("/check", checkKey);

router.post("/fetch", fetchAllPasswords);
router.post("/site", fetchPasswordBySite);

router.post("/add", addpass);
export default router;
