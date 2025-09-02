import express from "express";
import { login, register } from "../controller/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, (req, res) => {
  res.status(200).json({ user: req.user });
});
export default router;
