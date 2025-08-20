import { registerUser } from "../services/auth.service.js";
import { wrapAsync } from "../utils/wrapAsync.js";
export const register = wrapAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const token = await registerUser({ name, email, password });
  res.status(201).json({ token });
});

export const login = wrapAsync(async (req, res) => {
  res.send("Login");
});
