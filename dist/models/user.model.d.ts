import { HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<User>;
export declare class User {
    firstName: string;
    email: string;
    password: string;
}
export declare const UserSchema: any;
