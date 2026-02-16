import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { IncomeEntry } from "./entities/IncomeEntry";
import { ExpenseCategory } from "./entities/ExpenseCategory";
import { ExpenseEntry } from "./entities/ExpenseEntry";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, IncomeEntry, ExpenseCategory, ExpenseEntry],
    synchronize: true, // ⚠️ solo en desarrollo, crea tablas automáticamente
});
