import jwt from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "your_default_secret";

export const createUser = async (req, res) => {
  try {
    const { email, name, profile } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }

    // Check if user already exists
    let user = await prisma.auth.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.auth.create({
        data: {
          email,
          name,
          profile, // changed from `profile` to match your schema field
        },
      });
    }

    // Generate JWT token with user.id
    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "7d", // token expiration time
    });

    res.status(201).json({
      message: "User authenticated",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "server error!!" });
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
