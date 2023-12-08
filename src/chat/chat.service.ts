import { BadRequestException, Injectable } from "@nestjs/common";

import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Chat } from "src/models/chat.model";
import { User } from "src/models/user.model";
import { ChatMessageType } from "./chat.type";

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private ChatModel: Model<Chat>,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async getMessages(sendFrom: string, sendTo: string) {
    try {
      const fromOneWay = await this.ChatModel.find({
        sendFrom: sendFrom,
        sendTo: sendTo,
      });

      const fromSecondWay = await this.ChatModel.find({
        sendFrom: sendTo,
        sendTo: sendFrom,
      });

      const joinedData: any = fromOneWay.concat(fromSecondWay);

      joinedData.sort((a, b) => {
        return Date.parse(a.createdAt) - Date.parse(b.createdAt);
      });

      return joinedData;
    } catch (error) {
      new BadRequestException(error);
    }
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

    const savedChat = await this.ChatModel.findById(chat._id)
      .populate("sendFrom")
      .populate("sendTo");

    return savedChat;
  }
}
