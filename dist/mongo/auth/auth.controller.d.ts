import { AuthService } from "./auth.service";
import { AuthToken, InputSignIn } from "./auth.interface";
import { Request } from "express";
import { User } from "src/mongo/models/user.model";
import { SignUpValidator } from "./signup.validation";
interface AppRequest extends Request {
    userId: string;
}
export declare class AuthController {
    private readonly service;
    constructor(service: AuthService);
    signIn(input: InputSignIn): Promise<AuthToken>;
    signUp(input: SignUpValidator): Promise<AuthToken>;
    session(request: AppRequest): Promise<User>;
    deleteAccount(userId: string): Promise<import("mongodb").DeleteResult>;
}
export {};
