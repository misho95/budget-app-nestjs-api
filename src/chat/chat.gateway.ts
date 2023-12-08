import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({
  cors: {
    orign: "http://localhost:5173/",
  },
})
export class ChatGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage("message")
  handleMessage(@MessageBody() message: string): void {
    this.server.emit("message", message); // Broadcasts the received message to all connected clients
  }
}
