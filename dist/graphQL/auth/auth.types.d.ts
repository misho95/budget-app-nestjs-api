export declare class InputCreateUser {
    email: string;
    password: string;
}
export declare class Settings {
    hasEnabledSmsNotification: boolean;
}
export declare class Profile {
    displayName?: string;
    settings: Settings;
}
export declare class User {
    email?: string;
    password?: string;
    profile?: Profile;
}
