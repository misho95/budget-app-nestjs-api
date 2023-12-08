/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { ExpenseService } from "./expense.service";
import { Request } from "express";
import { ExpenseValidation } from "./expense.validation";
interface AppRequest extends Request {
    userId: string;
}
export declare class ExpenseController {
    private readonly expenseService;
    constructor(expenseService: ExpenseService);
    myExpenses(req: AppRequest): Promise<(import("mongoose").Document<unknown, {}, import("../models/expense.model").Expense> & import("../models/expense.model").Expense & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    expenseSorted(req: AppRequest): Promise<import("./expense.interface").ExpenseType[]>;
    countExpenses(req: AppRequest, type: string, value: string): Promise<number | import("@nestjs/common").BadRequestException>;
    searchExpenses(req: AppRequest, type: string, category: string, min_amount: number, max_amount: number, date_from: string, date_to: string): Promise<import("./expense.interface").ExpenseType[]>;
    expenseById(req: AppRequest, expenseId: string): Promise<import("mongoose").Document<unknown, {}, import("../models/expense.model").Expense> & import("../models/expense.model").Expense & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    addExpense(req: AppRequest, input: ExpenseValidation): Promise<{
        status: string;
    }>;
    editExpense(expenseId: string, input: ExpenseValidation): Promise<{
        status: string;
    }>;
    deleteExpense(expenseId: string): Promise<import("@nestjs/common").BadRequestException | {
        Status: string;
    }>;
    clearExpenses(userId: string): Promise<import("mongodb").DeleteResult>;
    expenseByArchived(filter: boolean, req: AppRequest): Promise<(import("mongoose").Document<unknown, {}, import("../models/expense.model").Expense> & import("../models/expense.model").Expense & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    isArchived(expenseId: string, archived: boolean): Promise<import("@nestjs/common").BadRequestException | {
        status: string;
    }>;
}
export {};
