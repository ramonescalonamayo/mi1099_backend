import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class IncomeEntry {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    sourceName!: string;

    @Column("float")
    amount!: number;

    @Column()
    taxYear!: number;

    @Column()
    dateReceived!: Date;

    @CreateDateColumn()
    createdAt!: Date;

    @ManyToOne(() => User, (user) => user.incomes, { onDelete: "CASCADE" })
    user!: User;
}
