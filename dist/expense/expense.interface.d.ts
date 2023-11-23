export interface InputAddExpense {
    amount: number;
    category: string;
    type: string;
}
export interface ExpenseType {
    id: string;
    userId: string;
    amount: number;
    category: string;
    isArchived: boolean;
    createdAt: string;
    updatedAt: string;
}
