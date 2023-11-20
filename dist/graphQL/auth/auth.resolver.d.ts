import { AuthService } from "./auth.service";
import { InputCreateUser, User } from "./auth.types";
export declare class AuthResolver {
    private authService;
    constructor(authService: AuthService);
    user(userId: string): User;
    createUser(body: InputCreateUser): boolean;
}
