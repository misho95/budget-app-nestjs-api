import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

interface UserSocketMap {
  [userId: string]: Socket;
}

@WebSocketGateway({
  cors: {
    orign: "*",
  },
})
export class ChatGateway {
  @WebSocketServer() server: Server;
  private userSocketMap: UserSocketMap = {};

  handleConnection(client: Socket) {
    // Handle new connections, for example, store user/socket mapping
    client.on("login", (userId: string) => {
      this.userSocketMap[userId] = client;
    });
  }

  @SubscribeMessage("message")
  handleMessage(
    @MessageBody() data: { message: string; userId: string }
  ): void {
    const { message, userId } = data;

    // Retrieve the socket associated with the user
    const socket = this.userSocketMap[userId];
    if (socket) {
      socket.emit("message", message);
    }
  }
}
