import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./src/config/mongodb.config.js";
import shorturl from "./src/routes/shorturl.route.js";
import authRoutes from "./src/routes/auth.route.js";
import userRoutes from "./src/routes/user.route.js";

import { redirectFromShortUrl } from "./src/controller/shorturl.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import { attachUser } from "./src/utils/attachUser.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || true,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(attachUser);

// API Health Check
app.get("/api", (req, res) => {
  res.status(200).json({
    success: true,
    message: "URL Shortener API is running",
  });
});

// API Routes
app.use("/api/create", shorturl);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// Serve React build
app.use(express.static(path.join(__dirname, "../FRONTEND/dist")));

// Short URL redirect route
app.get("/:id", redirectFromShortUrl);

// React Router fallback
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "../FRONTEND/dist/index.html"));
});

// Error Handler (keep last)
app.use(errorHandler);

// Start Server
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`✅ Server running on port ${PORT}`);
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
});
