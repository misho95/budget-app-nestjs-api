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
    myExpenses(req: AppRequest): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../models/expense.model").Expense> & import("../models/expense.model").Expense & {
        _id: import("mongoose").Types.ObjectId;
    })[], import("mongoose").Document<unknown, {}, import("../models/expense.model").Expense> & import("../models/expense.model").Expense & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, import("../models/expense.model").Expense, "find">;
    addExpense(req: AppRequest, input: ExpenseValidation): Promise<{
        status: string;
    }>;
    isArchived(expenseId: string, archived: boolean): Promise<import("@nestjs/common").BadRequestException | {
        status: string;
    }>;
}
export {};
