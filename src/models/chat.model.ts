import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "./user.model";

export type ChatDocument = HydratedDocument<Chat>;

@Schema({
  timestamps: true,
})
export class Chat {
  @Prop({ required: true })
  userName: string;
  @Prop({ required: true })
  message: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  sendFrom: User;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  sendTo: User;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
