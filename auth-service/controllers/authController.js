import jwt from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
const prisma = new PrismaClient();
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import redisClient from "../config/redis.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_default_secret";
dotenv.config();

export const createUser = async (req, res) => {
  try {
    const { email, name, profile } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }

    // Check if user already exists
    const existingUser = await prisma.auth.findUnique({ where: { email } });
    if (existingUser) {
      // Generate JWT token for existing user
      const token = jwt.sign({ id: existingUser.id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.status(200).json({
        message: "User already exists",
        user: {
          id: existingUser.id,
          email: existingUser.email,
          name: existingUser.name,
        },
        token,
      });
    }

    const newUserId = uuidv4();

    // Step 1: Sync to Vault first
    try {
      await axios.post(`${process.env.VAULT_URL}/vault/public/user/create`, {
        id: newUserId,
        email,
      });
    } catch (err) {
      console.error("❌ Vault creation failed:", err.message);
      return res
        .status(500)
        .json({ error: "Vault sync failed. User not created." });
    }

    // Step 2: Only create user in Auth DB if Vault sync succeeded
    const user = await prisma.auth.create({
      data: {
        id: newUserId,
        email,
        name,
        profile,
      },
    });

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      message: "User created and synced successfully",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    });
  } catch (err) {
    console.error("❌ Error in createUser:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: User ID missing" });
    }
    // ✅ Check Redis cache first
    const cachedUser = await redisClient.get(`user:${userId}`);
    if (cachedUser) {
      console.log("✅ Returned from Redis cache");
      return res.status(200).json(JSON.parse(cachedUser));
    }

    const user = await prisma.auth.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        profile: true,
        subscription: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const existingBreaches = await prisma.exposedData.findMany({
      where: { userId: user.id },
    });

    const userData = { ...user, breaches: existingBreaches };

    await redisClient.setEx(`user:${userId}`, 60, JSON.stringify(userData));

    res.status(200).json(userData);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
