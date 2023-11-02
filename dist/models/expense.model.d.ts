import { HydratedDocument } from 'mongoose';
import { User } from './user.model';
export type CatDocument = HydratedDocument<Expense>;
export declare class Expense {
    amount: number;
    type: string;
    category: string;
    userId: string;
    user: User;
}
export declare const ExpenseSchema: any;
