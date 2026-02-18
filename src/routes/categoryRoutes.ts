import { Router } from "express";
import { ExpenseCategory } from "../entities/ExpenseCategory";
import { AppDataSource } from "../data-source";

const router = Router();
const categoryRepo = AppDataSource.getRepository(ExpenseCategory);

router.get("/:professionType", async (req, res) => {
  const { professionType } = req.params;

  try {
    const categories = await categoryRepo.find({
      where: [
        { professionType: professionType }          
      ],
    });

    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

export default router;
