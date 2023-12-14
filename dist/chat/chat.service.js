"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const chat_model_1 = require("../models/chat.model");
const user_model_1 = require("../models/user.model");
let ChatService = class ChatService {
    constructor(ChatModel, userModel) {
        this.ChatModel = ChatModel;
        this.userModel = userModel;
    }
    async getMessages(sendFrom, sendTo) {
        const sendToUser = await this.userModel.findOne({ _id: sendTo });
        const messages = await this.ChatModel.find({
            $or: [
                { sendFrom: sendFrom, sendTo: sendToUser.id },
                { sendFrom: sendToUser.id, sendTo: sendFrom },
            ],
        }).sort({ createdAt: 1 });
        return messages;
    }
    async sendMessages(sendFrom, sendTo, input) {
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
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(chat_model_1.Chat.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_model_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ChatService);
//# sourceMappingURL=chat.service.js.map