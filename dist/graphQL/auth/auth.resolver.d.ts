import { AuthService } from "./auth.service";
import { InputCreateUser } from "./auth.types";
export declare class AuthResolver {
    private authService;
    constructor(authService: AuthService);
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
