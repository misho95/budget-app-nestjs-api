import { Request } from "express";
import { ChatService } from "./chat.service";
import { messageValidation } from "./message.validation";
interface AppRequest extends Request {
    userId: string;
}
export declare class ChatController {
    private readonly ChatService;
    constructor(ChatService: ChatService);
    getMessages(req: AppRequest, sendTo: string): Promise<any>;
    sendMessages(req: AppRequest, sendTo: string, input: messageValidation): Promise<{
        status: string;
    }>;
    deleteMessages(): void;
}
export {};
