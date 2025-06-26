import jwt from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import axios from "axios";

const JWT_SECRET = process.env.JWT_SECRET || "your_default_secret";

export const createUser = async (req, res) => {
  try {
    const { email, name, profile } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }

    // Check if user already exists
    const existingUser = await prisma.auth.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists." });
    }

    // Step 1: Sync to Vault first
    try {
      await axios.post("http://localhost:8080/vault/public/user/create", {
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
      data: { email, name, profile },
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

    const user = await prisma.auth.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        subscription: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
