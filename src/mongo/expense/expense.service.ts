import { BadRequestException, Injectable } from "@nestjs/common";

import { Expense } from "../models/expense.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { InputAddExpense } from "./expense.interface";
import { User } from "src/V1/models/user.model";

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(Expense.name) private expenseModel: Model<Expense>,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  userExpenses(userId: string) {
    return this.expenseModel.find({ userId: userId });
  }

  async create(userId: string, input: InputAddExpense) {
    const user = await this.userModel.findOne({ _id: userId });
    const expense = new this.expenseModel();
    const { type, category, amount } = input;
    expense.userId = user;
    expense.type = type;
    expense.category = category;
    expense.amount = amount;

    await expense.save();
    return { status: "ok!" };
  }

  async edit(expenseId: string, input: InputAddExpense) {
    const { category, type, amount } = input;
    await this.expenseModel.updateOne(
      { _id: expenseId },
      {
        $set: {
          category,
          type,
          amount,
        },
      }
    );
    return { status: "ok!" };
  }

  async delete(expenseId: string) {
    const expnese = await this.expenseModel.findOne({ _id: expenseId });
    if (!expnese) {
      return new BadRequestException({ status: "Invalid Id" });
    }
    await this.expenseModel.deleteOne({ _id: expenseId });
    return { Status: "ok!" };
  }

  async archiveExpense(expenseId: string, archived: boolean) {
    const expense = await this.expenseModel.findOne({ _id: expenseId });

    if (expense.isArchived === archived) {
      return new BadRequestException(
        `Expense Already ${archived ? "Archived" : "UnArchaived"} `
      );
    }

    await this.expenseModel.updateOne(
      { _id: expenseId },
      { $set: { isArchived: archived } }
    );
    return { status: "ok!" };
  }

  async getExpenseByArchived(filter: boolean, userId: string) {
    return await this.expenseModel.find({ isArchived: filter, userId });
  }
}
