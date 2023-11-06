import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Expense } from "src/models/expense.model";
import { Model } from "mongoose";
export declare class OwnerGuard implements CanActivate {
    private expenseModel;
    constructor(expenseModel: Model<Expense>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
