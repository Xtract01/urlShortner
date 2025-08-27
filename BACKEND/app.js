import express from "express";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
import connectDB from "./src/config/mongodb.config.js";
import urlSchema from "./src/models/shorturl.model.js";
import shorturl from "./src/routes/shorturl.route.js";
import { redirectFromShortUrl } from "./src/controller/shorturl.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import authRoutes from "./src/routes/auth.route.js";
import cors from "cors";
import { attachUser } from "./src/utils/attachUser.js";
import cookieParser from "cookie-parser";
dotenv.config("./.env");
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(attachUser);
app.use("/api/create", shorturl);
app.use("/api/auth", authRoutes);
app.get("/:id", redirectFromShortUrl);
app.use(errorHandler);
app.listen(3000, () => {
  connectDB();
  console.log("Server is running on port http://localhost:3000");
});
