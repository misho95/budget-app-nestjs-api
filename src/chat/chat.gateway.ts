import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class ChatGateway {
  constructor() {}
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
  @SubscribeMessage("typeing")
  handleTypeing(
    @MessageBody()
    messageData: {
      roomId: string;
      userId: string;
      isTypeing: boolean;
    }
  ): void {
    this.server.to(messageData.roomId).emit("typeing", {
      userId: messageData.userId,
      isTypeing: messageData.isTypeing,
    });
  }
}
