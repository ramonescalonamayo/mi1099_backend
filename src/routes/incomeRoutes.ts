import { Router } from "express";
import { IncomeEntry } from "../entities/IncomeEntry";
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";

const router = Router();
const incomeRepo = AppDataSource.getRepository(IncomeEntry);
const userRepo = AppDataSource.getRepository(User);

// Crear ingreso
router.post("/", async (req, res) => {
  const { userId, sourceName, amount, dateReceived, taxYear } = req.body;
  try {
    const user = await userRepo.findOneBy({ id: userId });
    if (!user) return res.status(404).json({ error: "User not found" });

    const income = incomeRepo.create({ sourceName, amount, dateReceived, taxYear, user });
    await incomeRepo.save(income);
    res.status(201).json(income);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
});

// Listar ingresos
router.get("/", async (_req, res) => {
  const incomes = await incomeRepo.find({ relations: ["user"] });
  res.json(incomes);
});

export default router;
