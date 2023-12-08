import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer() server: Server;
  @SubscribeMessage("message")
  handleMessage(@MessageBody() message: string): void {
    this.server.emit("message", message); // Broadcasts the received message to all connected clients
  }
}
