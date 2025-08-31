import { findUserByEmail, createUser } from "../dao/user.dao.js";
import { signToken } from "../utils/helper.js";
import bcrypt from "bcryptjs";
export const registerUser = async ({ name, email, password }) => {
  const user = await findUserByEmail(email);
  if (user) throw new Error("User already exists");
  const newUser = await createUser({ name, email, password });
  const token = signToken({ id: newUser._id });
  return token;
};
export const loginUser = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("User not found");
  if (!password) throw new Error("Password missing from request");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");
  const token = signToken({ id: user._id });
  return { token, user };
};
