import { Server, Socket } from "socket.io";
import { ChatService } from "./chat.service";
export declare class ChatGateway {
    private readonly ChatService;
    constructor(ChatService: ChatService);
    server: Server;
    handleJoinRoom(client: Socket, roomName: string): void;
    handleLeaveRoom(client: Socket, roomName: string): void;
    handleMessage(messageData: {
        message: string;
        data: any;
    }, client: Socket): void;
}
