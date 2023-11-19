import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Expense } from "src/mongo/models/expense.model";
import { Model } from "mongoose";

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(
    @InjectModel(Expense.name) private expenseModel: Model<Expense>
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const userId = request.userId;
    const user = request.user;
    const expenseId = request.params.expenseId;

    const expense = await this.expenseModel.findOne({ _id: expenseId });

    const isEqual = expense.userId.toString() === userId;

    //checks if role is admin
    if (user.role === "admin") {
      return true;
    }

    //checks if user is owner
    if (!expense || !isEqual) {
      return false;
    }

    return true;
  }
}
