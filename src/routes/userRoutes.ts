import { Router } from "express";
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";

const router = Router();
const userRepo = AppDataSource.getRepository(User);

// Crear usuario
router.post("/", async (req, res) => {
  const { fullName, email, passwordHash, professionType, preferredLanguage } = req.body;
  try {
    const user = userRepo.create({ fullName, email, passwordHash, professionType, preferredLanguage });
    await userRepo.save(user);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
});

// Listar usuarios
router.get("/", async (_req, res) => {
  const users = await userRepo.find({ relations: ["incomes", "expenses"] });
  res.json(users);
});

export default router;
