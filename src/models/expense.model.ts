import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { User } from './user.model';

// 1. მოდელის შექმნა
// 2. მოდელის შეიმპორტება სერვისში
// 3. მოდელის შეიმპორტება ნესტის მოდულში

export type CatDocument = HydratedDocument<Expense>;

@Schema({
  timestamps: true,
})
export class Expense {
  @Prop({ required: true })
  amount: number;

  @Prop()
  type: string;

  @Prop()
  category: string;

  @Prop()
  userId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
