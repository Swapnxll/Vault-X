import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const createkey = async (req, res) => {
  const { masterkey } = req.body;
  const userId = req.headers["x-user-id"];

  if (!masterkey) {
    return res.status(400).json({ error: "Masterkey is required." });
  }

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized: User ID missing." });
  }

  const user = await prisma.auth.findUnique({ where: { id: userId } });

  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  // ✅ Hash masterkey
  const saltRounds = 10;
  const hashedMasterkey = await bcrypt.hash(masterkey, saltRounds);

  // ✅ Save hashed masterkey to user
  await prisma.auth.update({
    where: { id: userId },
    data: { masterkey: hashedMasterkey }, // ensure 'masterkey' field exists in your schema
  });

  res.status(200).json({ message: "Masterkey hashed and saved securely." });
};

export const checkKey = async (req, res) => {
  const { masterkey } = req.body;
  const userId = req.headers["x-user-id"];

  if (!masterkey) {
    return res.status(400).json({ error: "Masterkey is required." });
  }

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized: User ID missing." });
  }

  const user = await prisma.auth.findUnique({
    where: { id: userId },
    select: { masterkey: true },
  });

  if (!user || !user.masterkey) {
    return res.status(404).json({ error: "Masterkey not found for user." });
  }

  // ✅ Compare hashed masterkey with input
  const isMatch = await bcrypt.compare(masterkey, user.masterkey);

  if (isMatch) {
    return res.status(200).json({ message: "Masterkey is valid." });
  } else {
    return res.status(401).json({ error: "Invalid masterkey." });
  }
};

export const addpass = async (req, res) => {};
