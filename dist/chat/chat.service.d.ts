import { Model } from "mongoose";
import { Chat } from "src/models/chat.model";
import { User } from "src/models/user.model";
export declare class ChatService {
    private ChatModel;
    private userModel;
    constructor(ChatModel: Model<Chat>, userModel: Model<User>);
    getMessages(sendFrom: string, sendTo: string): Promise<any>;
    sendMessages(sendFrom: string, sendTo: string, input: any): Promise<{
        status: string;
    }>;
}
