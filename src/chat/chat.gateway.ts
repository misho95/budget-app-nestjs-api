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
  @SubscribeMessage("message")
  handleMessage(
    @MessageBody() MSdata: { message: string; data: any },
    @ConnectedSocket() client: Socket
  ): void {
    const { message, data } = MSdata;
    this.server.emit("message", { message, data });
  }
}
