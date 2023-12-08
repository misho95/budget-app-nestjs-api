import { Server, Socket } from "socket.io";
export declare class ChatGateway {
    server: Server;
    private userSocketMap;
    handleConnection(client: Socket): void;
    handleMessage(data: {
        message: string;
        userId: string;
    }): void;
}
