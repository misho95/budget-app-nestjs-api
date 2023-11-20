import { InputCreateUser, User } from "./auth.types";
export declare class AuthService {
    private users;
    user(userId: string): User;
    createUser(body: InputCreateUser): boolean;
}
