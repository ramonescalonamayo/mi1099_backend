import "reflect-metadata";
import { AppDataSource } from "../data-source";
import { ExpenseCategory } from "../entities/ExpenseCategory";
import { defaultCategories } from "../data/expenseCategories";

AppDataSource.initialize()
  .then(async () => {
    const categoryRepo = AppDataSource.getRepository(ExpenseCategory);

    for (const categorie of defaultCategories) {
      const exists = await categoryRepo.findOneBy({ name: categorie.name });
      if (!exists) {
        const category = categoryRepo.create(categorie);
        await categoryRepo.save(category);
        console.log(`Inserted category: ${categorie.name}`);
      }
    }

    console.log("All default categories inserted ✅");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error seeding categories:", err);
    process.exit(1);
  });
