export interface InputSignIn {
    email: string;
    password: string;
}
export interface InputSignUp {
    email: string;
    username: string;
    password: string;
    firstName: string;
}
export interface AuthToken {
    accessToken: string;
}
