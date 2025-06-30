import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
import SimpleCryptoModule from "simple-crypto-js";
const SimpleCrypto = SimpleCryptoModule.default;

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

  // ✅ Check if masterkey already exists
  if (user.masterkey) {
    return res
      .status(403)
      .json({ error: "Masterkey already set for this user. Cannot change." });
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

export const addpass = async (req, res) => {
  const { site, password, masterkey, email } = req.body;
  const userId = req.headers["x-user-id"];

  if (!site || !password || !masterkey) {
    return res
      .status(400)
      .json({ error: "Site, password, and masterkey are required." });
  }

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized: User ID missing." });
  }

  // ✅ Get user's hashed masterkey
  const user = await prisma.auth.findUnique({
    where: { id: userId },
    select: { masterkey: true },
  });

  if (!user || !user.masterkey) {
    return res.status(404).json({ error: "Masterkey not found for user." });
  }

  // ✅ Compare provided masterkey with hashed masterkey
  const isMatch = await bcrypt.compare(masterkey, user.masterkey);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid masterkey." });
  }

  // ✅ Encrypt password using simple-crypto-js with provided masterkey as key
  const sc = new SimpleCrypto(masterkey);
  const encryptedPassword = sc.encrypt(password);

  // ✅ Save to database
  await prisma.vault.create({
    data: {
      email,
      site,
      password: encryptedPassword, // adjust field based on your schema
      userId,
    },
  });

  res
    .status(201)
    .json({ message: "Password encrypted and saved successfully." });
};

export const fetchAllPasswords = async (req, res) => {
  const { masterkey } = req.body;
  const userId = req.headers["x-user-id"];

  if (!masterkey) {
    return res.status(400).json({ error: "Masterkey is required." });
  }

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized: User ID missing." });
  }

  // ✅ Verify masterkey
  const user = await prisma.auth.findUnique({
    where: { id: userId },
    select: { masterkey: true },
  });

  if (!user || !user.masterkey) {
    return res.status(404).json({ error: "Masterkey not found for user." });
  }

  const isMatch = await bcrypt.compare(masterkey, user.masterkey);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid masterkey." });
  }

  // ✅ Fetch all passwords
  const passwords = await prisma.vault.findMany({
    where: { userId },
    select: { id: true, site: true, password: true },
  });

  // ✅ Decrypt each
  const sc = new SimpleCrypto(masterkey);
  const decrypted = passwords.map((p) => ({
    id: p.id,
    site: p.site,
    password: sc.decrypt(p.password),
  }));

  res.status(200).json({ passwords: decrypted });
};

export const fetchPasswordBySite = async (req, res) => {
  const { masterkey, site } = req.body;
  const userId = req.headers["x-user-id"];

  if (!masterkey || !site) {
    return res.status(400).json({ error: "Masterkey and site are required." });
  }

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized: User ID missing." });
  }

  // ✅ Verify masterkey
  const user = await prisma.auth.findUnique({
    where: { id: userId },
    select: { masterkey: true },
  });

  if (!user || !user.masterkey) {
    return res.status(404).json({ error: "Masterkey not found for user." });
  }

  const isMatch = await bcrypt.compare(masterkey, user.masterkey);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid masterkey." });
  }

  // ✅ Fetch multiple passwords by site
  const records = await prisma.vault.findMany({
    where: { userId, site },
    select: { id: true, site: true, password: true, email: true },
  });

  if (!records || records.length === 0) {
    return res.status(404).json({ error: "No passwords found for this site." });
  }

  // ✅ Decrypt each password
  const sc = new SimpleCrypto(masterkey);
  const decryptedResults = records.map((data) => ({
    id: data.id,
    site: data.site,
    password: sc.decrypt(data.password),
    email: data.email,
  }));

  res.status(200).json({ passwords: decryptedResults });
};
