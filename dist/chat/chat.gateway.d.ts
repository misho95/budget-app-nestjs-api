import { Server, Socket } from "socket.io";
import { ChatService } from "./chat.service";
export declare class ChatGateway {
    private readonly ChatService;
    constructor(ChatService: ChatService);
    server: Server;
    handleMessage(MSdata: {
        message: string;
        data: any;
    }, client: Socket): void;
}
