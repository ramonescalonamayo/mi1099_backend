import express from "express";
import { AppDataSource } from "./data-source";
import userRoutes from "./routes/userRoutes";
import incomeRoutes from "./routes/incomeRoutes";
import expenseRoutes from "./routes/expenseRoutes";
import reportRoutes from "./routes/reportRoutes";
import categoryRoutes from "./routes/categoryRoutes";

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    app.use("/users", userRoutes);
    app.use("/incomes", incomeRoutes);
    app.use("/expenses", expenseRoutes);
    app.use("/categories", categoryRoutes);
    app.use("/reports", reportRoutes);

    app.get("/", (req, res) => {
      res.json({ message: "mi1099 backend running 🚀" });
    });

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
