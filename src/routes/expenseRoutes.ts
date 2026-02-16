import { Router } from "express";
import { ExpenseEntry } from "../entities/ExpenseEntry";
import { User } from "../entities/User";
import { ExpenseCategory } from "../entities/ExpenseCategory";
import { AppDataSource } from "../data-source";

const router = Router();
const expenseRepo = AppDataSource.getRepository(ExpenseEntry);
const userRepo = AppDataSource.getRepository(User);
const categoryRepo = AppDataSource.getRepository(ExpenseCategory);

// Crear gasto
router.post("/", async (req, res) => {
  const { userId, categoryId, description, amount, date, taxYear } = req.body;
  try {
    const user = await userRepo.findOneBy({ id: userId });
    const category = await categoryRepo.findOneBy({ id: categoryId });

    if (!user) return res.status(404).json({ error: "User not found" });
    if (!category) return res.status(404).json({ error: "Category not found" });

    const expense = expenseRepo.create({ user, category, description, amount, date, taxYear });
    await expenseRepo.save(expense);
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
});

// Listar gastos
router.get("/", async (_req, res) => {
  const expenses = await expenseRepo.find({ relations: ["user", "category"] });
  res.json(expenses);
});

export default router;
