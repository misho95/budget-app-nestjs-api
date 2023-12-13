import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { Request } from "express";
import { ChatService } from "./chat.service";
import { messageValidation } from "./message.validation";

interface AppRequest extends Request {
  userId: string;
}

@Controller("/api/chat")
export class ChatController {
  constructor(private readonly ChatService: ChatService) {}

  @UseGuards(AuthGuard)
  @Get("/:userId")
  getMessages(@Req() req: AppRequest, @Param("userId") sendTo: string) {
    return this.ChatService.getMessages(req.userId, sendTo);
  }

  @UseGuards(AuthGuard)
  @Post("/:userId")
  sendMessages(
    @Req() req: AppRequest,
    @Param("userId") sendTo: string,
    @Body() input: messageValidation
  ) {
    return this.ChatService.sendMessages(req.userId, sendTo, input);
  }

  @UseGuards(AuthGuard)
  @Delete("/")
  deleteMessages() {}
}
