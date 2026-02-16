import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ExpenseEntry } from "./ExpenseEntry";

@Entity()
export class ExpenseCategory {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    name!: string;

    @Column({ nullable: true })
    professionType!: string;

    @OneToMany(() => ExpenseEntry, (expense) => expense.category)
    expenses!: ExpenseEntry[];
}
