import { AuthService } from "./auth.service";
import { AuthToken, InputSignIn } from "./auth.interface";
import { Request } from "express";
import { User } from "src/models/user.model";
import { SignUpValidator } from "./validators/signup.validation";
import { ResetPasswordValidator } from "./validators/password.reset.validator";
import { CheckEmailValidator } from "./validators/check.email.validator";
interface AppRequest extends Request {
    userId: string;
}
export declare class AuthController {
    private readonly service;
    constructor(service: AuthService);
    signIn(input: InputSignIn): Promise<AuthToken>;
    signUp(input: SignUpValidator): Promise<AuthToken>;
    checkEmail(input: CheckEmailValidator): Promise<string>;
    resetPassword(input: ResetPasswordValidator): Promise<{
        status: string;
    }>;
    session(request: AppRequest): Promise<User>;
    deactivate(request: AppRequest): Promise<{
        status: string;
    }>;
    activate(request: AppRequest): Promise<{
        status: string;
    }>;
    deleteAccount(userId: string): Promise<import("mongodb").DeleteResult>;
}
export {};
