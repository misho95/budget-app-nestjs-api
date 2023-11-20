import { ExpenseEditInputType, ExpenseInputType, ExpenseType } from "./expense.types";
import { ExpenseService } from "./expense.service";
export declare class ExpenseResolver {
    private expenseService;
    constructor(expenseService: ExpenseService);
    expense(amount: number, type: string, createdAt: string): ExpenseType[];
    expenseById(expenseId: string): ExpenseType[];
    addExpense(body: ExpenseInputType): boolean;
    editExpense(expenseId: string, body: ExpenseEditInputType): boolean;
}
