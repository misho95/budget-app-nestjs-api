import mongoose, { HydratedDocument } from "mongoose";
import { User } from "./user.model";
export type CatDocument = HydratedDocument<Expense>;
export declare class Expense {
    amount: number;
    type: string;
    isArchived: boolean;
    category: string;
    userId: User;
}
export declare const ExpenseSchema: mongoose.Schema<Expense, mongoose.Model<Expense, any, any, any, mongoose.Document<unknown, any, Expense> & Expense & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Expense, mongoose.Document<unknown, {}, mongoose.FlatRecord<Expense>> & mongoose.FlatRecord<Expense> & {
    _id: mongoose.Types.ObjectId;
}>;
