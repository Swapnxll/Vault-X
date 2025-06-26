import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//POST VAULT/PUBLIC/USER/CREATE
export const createUser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }

    // Check if user already exists
    const existingUser = await prisma.auth.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists." });
    }

    // Create user
    const user = await prisma.auth.create({
      data: {
        email,
      },
    });

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
