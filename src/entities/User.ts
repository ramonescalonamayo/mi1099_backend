import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from "typeorm";
import { IncomeEntry } from "./IncomeEntry";
import { ExpenseEntry } from "./ExpenseEntry";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    fullName!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    passwordHash!: string;

    @Column()
    professionType!: string;

    @Column({ default: "es" })
    preferredLanguage!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @OneToMany(() => IncomeEntry, (income) => income.user)
    incomes!: IncomeEntry[];

    @OneToMany(() => ExpenseEntry, (expense) => expense.user)
    expenses!: ExpenseEntry[];
}
