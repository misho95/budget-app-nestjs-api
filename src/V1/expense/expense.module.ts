import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Expense, ExpenseSchema } from "../models/expense.model";
import { ExpenseController } from "./expense.controller";
import { ExpenseService } from "./expense.service";
import { User, UserSchema } from "src/V1/models/user.model";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Expense.name, schema: ExpenseSchema },
    ]),
  ],
  controllers: [ExpenseController],
  providers: [ExpenseService],
})
export class ExpenseModule {}
