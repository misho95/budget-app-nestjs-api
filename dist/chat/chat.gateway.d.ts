import { Server, Socket } from "socket.io";
export declare class ChatGateway {
    constructor();
    server: Server;
    handleJoinRoom(client: Socket, roomName: string): void;
    handleLeaveRoom(client: Socket, roomName: string): void;
    handleMessage(messageData: {
        message: string;
        data: any;
    }, client: Socket): void;
}
