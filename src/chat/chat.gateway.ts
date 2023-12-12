import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChatService } from "./chat.service";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class ChatGateway {
  constructor(private readonly ChatService: ChatService) {}
  @WebSocketServer() server: Server;

  @SubscribeMessage("joinRoom")
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomName: string
  ): void {
    client.join(roomName);
  }

  @SubscribeMessage("leaveRoom")
  handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomName: string
  ): void {
    client.leave(roomName); // Leave the specified room
  }

  @SubscribeMessage("message")
  handleMessage(
    @MessageBody() messageData: { message: string; data: any },
    @ConnectedSocket() client: Socket
  ): void {
    const { message, data } = messageData;
    // Broadcast the message to all clients in the room
    client.rooms.forEach((room: string) => {
      this.server.to(room).emit("message", { message, data });
    });
  }
}

// @SubscribeMessage("message")
// handleMessage(@MessageBody() MSdata: { message: string; data: any }): void {
//   const { message, data } = MSdata;
//   this.server.emit("message", { message, data });
// }
