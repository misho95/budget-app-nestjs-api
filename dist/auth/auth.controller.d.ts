import { AuthService } from './auth.service';
import { AuthToken, InputSignIn, InputSignUp } from './auth.interface';
import { Request } from 'express';
import { User } from 'src/models/user.model';
interface AppRequest extends Request {
    userId: string;
}
export declare class AuthController {
    private readonly service;
    constructor(service: AuthService);
    signIn(input: InputSignIn): Promise<AuthToken>;
    signUp(input: InputSignUp): Promise<AuthToken>;
    session(request: AppRequest): Promise<User>;
}
export {};
