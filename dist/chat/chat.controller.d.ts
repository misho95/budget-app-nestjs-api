/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
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
    sendMessages(req: AppRequest, sendTo: string, input: messageValidation): Promise<import("mongoose").Document<unknown, {}, import("../models/chat.model").Chat> & import("../models/chat.model").Chat & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteMessages(): void;
}
export {};
