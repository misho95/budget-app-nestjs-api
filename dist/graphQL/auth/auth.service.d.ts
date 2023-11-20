import { InputCreateUser } from "./auth.types";
export declare class AuthService {
    users(): {};
    user(): {
        email: string;
        password: string;
        profile: {
            displayName: string;
            settings: {
                hasEnabledSmsNotification: boolean;
            };
        };
    };
    createUser(body: InputCreateUser): boolean;
}
