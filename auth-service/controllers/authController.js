import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createUser = async (req, res) => {
  try {
    const { email, name, subscription } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }

    const user = await prisma.auth.create({
      data: {
        email,
        name,
        subscription: subscription ?? false, // defaults to false if not provided
      },
    });

    res.status(201).json(user);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "User already exists or server error." });
  }
};
