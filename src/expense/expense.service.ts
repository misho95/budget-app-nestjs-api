import { Injectable } from '@nestjs/common';

import { Expense } from '../models/expense.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(Expense.name) private expenseModel: Model<Expense>,
  ) {}

  userExpenses(userId: string) {
    return this.expenseModel.find({ userId: userId });
  }
}
