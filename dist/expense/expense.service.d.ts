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
/// <reference types="mongoose/types/inferschematype" />
import { BadRequestException } from "@nestjs/common";
import { Expense } from "../models/expense.model";
import { Model } from "mongoose";
import { InputAddExpense } from "./expense.interface";
import { User } from "src/models/user.model";
export declare class ExpenseService {
    private expenseModel;
    private userModel;
    constructor(expenseModel: Model<Expense>, userModel: Model<User>);
    userExpenses(userId: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Expense> & Expense & {
        _id: import("mongoose").Types.ObjectId;
    })[], import("mongoose").Document<unknown, {}, Expense> & Expense & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, Expense, "find">;
    create(userId: string, input: InputAddExpense): Promise<{
        status: string;
    }>;
    archiveExpense(expenseId: string, archived: boolean): Promise<BadRequestException | {
        status: string;
    }>;
}
