import { ExpenseInputType, ExpenseType } from "./expense.types";
export declare class ExpenseService {
    private readonly expenses;
    expense(amount: number, type: string, createdAt: string): ExpenseType[];
    expenseById(expenseId: string): ExpenseType[];
    addExpense(body: ExpenseInputType): boolean;
    editExpense(expenseId: string, body: ExpenseInputType): boolean;
}
