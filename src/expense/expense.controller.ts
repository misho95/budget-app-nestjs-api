import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

interface AppRequest extends Request {
  userId: string;
}

@Controller('/api/expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @UseGuards(AuthGuard)
  @Get('/my-expenses')
  myExpenses(@Req() req: AppRequest) {
    return this.expenseService.userExpenses(req.userId);
  }
}
