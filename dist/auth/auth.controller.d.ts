import { AuthService } from "./auth.service";
import { InputSignIn } from "./auth.interface";
import { Request } from "express";
import { User } from "src/models/user.model";
import { SignUpValidator } from "./validators/signup.validation";
import { ResetPasswordValidator } from "./validators/password.reset.validator";
import { CheckEmailValidator } from "./validators/check.email.validator";
interface AppRequest extends Request {
    userId: string;
}
interface CustomResponse extends Response {
    cookie(name: string, value: any, options?: any): this;
}
export declare class AuthController {
    private readonly service;
    constructor(service: AuthService);
    signIn(input: InputSignIn, response: CustomResponse): Promise<import("./auth.interface").AuthToken | {
        message: string;
    }>;
    signUp(input: SignUpValidator, response: CustomResponse): Promise<import("./auth.interface").AuthToken | {
        message: string;
    }>;
    clear(response: CustomResponse): {
        message: string;
    };
    checkEmail(input: CheckEmailValidator): Promise<string>;
    resetPassword(input: ResetPasswordValidator): Promise<{
        status: string;
    }>;
    session(request: AppRequest): Promise<User>;
    profile(userId: string): Promise<User>;
    users(request: AppRequest): Promise<User[]>;
    deactivate(request: AppRequest): Promise<{
        status: string;
    }>;
    activate(request: AppRequest): Promise<{
        status: string;
    }>;
    deleteAccount(userId: string): Promise<import("mongodb").DeleteResult>;
    handleInActiveUser(): void;
}
export {};
