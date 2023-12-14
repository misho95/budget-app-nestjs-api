import { BadRequestException, Injectable } from "@nestjs/common";
import { Expense } from "../models/expense.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ExpenseType, InputAddExpense } from "./expense.interface";
import { User } from "src/models/user.model";

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(Expense.name) private expenseModel: Model<Expense>,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async userExpenses(userId: string) {
    return await this.expenseModel.find({ userId: userId });
  }

  async expenseById(userId: string, expenseId: string) {
    return await this.expenseModel.findOne({ _id: expenseId, userId });
  }

  async expenseSorted(userId: string) {
    const expenses = await this.expenseModel
      .find({ userId })
      .sort({ updatedAt: -1 });
    return expenses;
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

  async countExpenses(userId: string, type: string, value: string) {
    if (!type && !value) {
      return new BadRequestException(`Bad Request!`);
    }

    if (type === "type") {
      const expenses = await this.expenseModel.find({ userId, type: value });
      return expenses.length;
    } else if (type === "category") {
      const expenses = await this.expenseModel.find({
        userId,
        category: value,
      });
      return expenses.length;
    } else {
      return new BadRequestException(`Bad Request!`);
    }
  }

  async searchExpenses(
    userId: string,
    type: string,
    category: string,
    min_amount: number,
    max_amount: number,
    date_from: string,
    date_to: string
  ) {
    const expenses: ExpenseType[] = await this.expenseModel.find({ userId });

    const filteredData = expenses.filter((item) => {
      const isDateMatched =
        (!date_from || Date.parse(item.createdAt) > Date.parse(date_from)) &&
        (!date_to || Date.parse(item.createdAt) < Date.parse(date_to));
      const isCategoryMatched =
        !category || item.category.toLowerCase() === category.toLowerCase();
      const isTypeMatched =
        !type || item.type.toLowerCase() === type.toLowerCase();
      const isAmountMatched =
        (!min_amount || +item.amount > +min_amount) &&
        (!max_amount || +item.amount < +max_amount);
      return (
        isCategoryMatched && isTypeMatched && isAmountMatched && isDateMatched
      );
    });
    return filteredData;
  }

  async clearExpenses(userId: string) {
    return await this.expenseModel.deleteMany({ userId: userId });
  }
}
