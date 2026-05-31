import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as authRepo from "../repositories/authRepo.js";
import { sendWelcomeEmail } from "./emailService.js";

const register = async ({ name, email, password, role, avatar }) => {
  const existing = await authRepo.findUserByEmail(email);

  if (existing) throw new Error("Email sudah terdaftar");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await authRepo.createUser(
    name,
    email,
    hashedPassword,
    role,
    avatar,
  );

  await sendWelcomeEmail(email).catch((err) => {
    console.error("Gagal kirim welcome email:", err.message);
  });

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  return { user, token };
};

const login = async ({ email, password }) => {
  const user = await authRepo.findUserByEmail(email);

  if (!user) throw new Error("Email atau password salah!");

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) throw new Error("Email atau password salah!");

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  const { password: _, ...safeUser } = user;
  return { user: safeUser, token };
};

export { register, login };
