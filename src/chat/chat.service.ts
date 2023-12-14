import { Injectable } from "@nestjs/common";

import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Chat } from "src/models/chat.model";
import { User } from "src/models/user.model";

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private ChatModel: Model<Chat>,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async getMessages(sendFrom: string, sendTo: string) {
    const sendToUser = await this.userModel.findOne({ _id: sendTo });

    const messages = await this.ChatModel.find({
      $or: [
        { sendFrom: sendFrom, sendTo: sendToUser.id },
        { sendFrom: sendToUser.id, sendTo: sendFrom },
      ],
    }).sort({ createdAt: 1 });

    return messages;
  }

  async sendMessages(sendFrom: string, sendTo: string, input: any) {
    const sendFromUser = await this.userModel.findOne({ _id: sendFrom });
    const sendToUser = await this.userModel.findOne({ _id: sendTo });

    const chat = new this.ChatModel();
    chat.userName = sendFromUser.userName;
    chat.message = input.message;
    chat.sendFrom = sendFromUser;
    chat.sendTo = sendToUser;

    await chat.save();

    const savedChat = await this.ChatModel.findOne({ _id: chat._id });

    return savedChat;
  }
}
