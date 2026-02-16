import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./User";
import { ExpenseCategory } from "./ExpenseCategory";

@Entity()
export class ExpenseEntry {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    description!: string;

    @Column("float")
    amount!: number;

    @Column()
    taxYear!: number;

    @Column()
    date!: Date;

    @CreateDateColumn()
    createdAt!: Date;

    @ManyToOne(() => User, (user) => user.expenses, { onDelete: "CASCADE" })
    user!: User;

    @ManyToOne(() => ExpenseCategory, (category) => category.expenses)
    category!: ExpenseCategory;
}
