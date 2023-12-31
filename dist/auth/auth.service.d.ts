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
import { AuthToken, InputSignIn, InputSignUp } from "./auth.interface";
import { User } from "../models/user.model";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import { CheckEmailValidator } from "./validators/check.email.validator";
import { ResetPasswordValidator } from "./validators/password.reset.validator";
import { Expense } from "src/models/expense.model";
import { Chat } from "src/models/chat.model";
export declare class AuthService {
    private readonly jwt;
    private userModel;
    private ChatModel;
    private expenseModel;
    constructor(jwt: JwtService, userModel: Model<User>, ChatModel: Model<Chat>, expenseModel: Model<Expense>);
    session(userId: string): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteAccount(userId: string): Promise<import("mongodb").DeleteResult>;
    signin(input: InputSignIn): Promise<AuthToken>;
    signup(input: InputSignUp): Promise<AuthToken>;
    checkForUserExist(input: CheckEmailValidator): Promise<string>;
    resetPassword(input: ResetPasswordValidator): Promise<{
        status: string;
    }>;
    deactivate(userId: string): Promise<{
        status: string;
    }>;
    activate(userId: string): Promise<{
        status: string;
    }>;
    users(userId: string): Promise<(import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    deleteInActiveUsers(): Promise<void>;
}
