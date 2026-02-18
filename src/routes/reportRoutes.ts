import { Router } from "express";
import { User } from "../entities/User";
import { IncomeEntry } from "../entities/IncomeEntry";
import { ExpenseEntry } from "../entities/ExpenseEntry";
import { AppDataSource } from "../data-source";

const router = Router();
const userRepo = AppDataSource.getRepository(User);
const incomeRepo = AppDataSource.getRepository(IncomeEntry);
const expenseRepo = AppDataSource.getRepository(ExpenseEntry);

router.get("/:userId/:taxYear", async (req, res) => {
  const { userId, taxYear } = req.params;

  const user = await userRepo.findOneBy({ id: userId });
  if (!user) return res.status(404).json({ error: "User not found" });

  const incomes = await incomeRepo.find({
    where: { user: { id: userId }, taxYear: parseInt(taxYear) },
  });
  const expenses = await expenseRepo.find({
    where: { user: { id: userId }, taxYear: parseInt(taxYear) },
  });

  const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  res.json({
    user: { id: user.id, fullName: user.fullName, email: user.email },
    taxYear: parseInt(taxYear),
    totalIncome,
    totalExpenses,
    netIncome: totalIncome - totalExpenses,
    incomes,
    expenses,
  });
});

// ✅ Export default router
export default router;
