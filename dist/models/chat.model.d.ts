import mongoose, { HydratedDocument } from "mongoose";
import { User } from "./user.model";
export type ChatDocument = HydratedDocument<Chat>;
export declare class Chat {
    userName: string;
    message: string;
    sendFrom: User;
    sendTo: User;
}
export declare const ChatSchema: mongoose.Schema<Chat, mongoose.Model<Chat, any, any, any, mongoose.Document<unknown, any, Chat> & Chat & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Chat, mongoose.Document<unknown, {}, mongoose.FlatRecord<Chat>> & mongoose.FlatRecord<Chat> & {
    _id: mongoose.Types.ObjectId;
}>;
