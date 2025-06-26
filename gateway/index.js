import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { verifyToken } from "./middlewares/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;

app.use(
  cors({
    origin: true, // or a specific origin: "http://localhost:3000"
    credentials: true, // needed if you send cookies or authorization headers
  })
);
app.use(morgan("dev"));

app.use(
  "/auth/public",
  createProxyMiddleware({
    target: process.env.auth_service,
    changeOrigin: true,
    //pathRewrite: { "^/user": "" }, //It removes /user from the beginning of the path.
  })
);
app.use(
  "/auth/protect",
  verifyToken,
  createProxyMiddleware({
    target: process.env.auth_service,
    changeOrigin: true,
    //pathRewrite: { "^/user": "" }, //It removes /user from the beginning of the path.
  })
);

app.use(
  "/vault/public",
  createProxyMiddleware({
    target: process.env.vault_service,
    changeOrigin: true,
    //pathRewrite: { "^/user": "" }, //It removes /user from the beginning of the path.
  })
);

app.listen(PORT, () => {
  console.log(`Gateway is running on port http://localhost:${PORT}`);
});

/*import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(morgan("dev"));

// 🔔 Ping helper (no await inside middleware)
const ping = async (url) => {
  try {
    await fetch(url);
    console.log(`✅ Pinged ${url}`);
  } catch (err) {
    console.warn(`⚠️ Ping failed for ${url}: ${err.message}`);
  }
};

// 🟡 Wake up both services on startup
(async () => {
  ping(`${process.env.auth_service}/`);
  ping(`${process.env.vault_service}/`);
})();

// 🔁 When using /user, ping vault (no await)
app.use(
  "/user",
  (req, res, next) => {
    ping(`${process.env.vault_service}/`);
    next();
  },
  createProxyMiddleware({
    target: process.env.auth_service,
    changeOrigin: true,
  })
);

// 🔁 When using /vault, ping auth (no await)
app.use(
  "/vault",
  (req, res, next) => {
    ping(`${process.env.auth_service}/`);
    next();
  },
  createProxyMiddleware({
    target: process.env.vault_service,
    changeOrigin: true,
  })
);

app.listen(PORT, () => {
  console.log(`🚀 Gateway is running on http://localhost:${PORT}`);
});
 */
