import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true })
  userName: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ default: true })
  active: boolean;
  @Prop({ default: null })
  deactivatedAt: Date | null;
  @Prop({ default: null })
  avatar: string | null;
  @Prop({ default: "user" })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
