import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import userRoute from "./routes/userRoutes.js";
import exposeRoute from "./routes/exposeRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;

app.use(
  cors({
    origin: true, // allow all origins or specify origin string/array
    credentials: true, // allow cookies and credentials to be sent
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.use("/user", userRoute);
app.use("/expose", exposeRoute);

app.get("/", async (req, res) => {
  try {
    await prisma.$connect();
    console.log("✅ Connected to Neon PostgreSQL database");
    res.send("Hello from Neon + Prisma!");
  } catch (err) {
    console.error("❌ Failed to connect to DB:", err);
    res.status(500).send("Database connection failed");
  }
});

app.get("/profile", (req, res) => {
  res.json({
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
  });
});

app.listen(PORT, () => {
  console.log(`Auth service running on http://localhost:${PORT}`);
});
