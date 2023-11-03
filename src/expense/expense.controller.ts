import {
  Body,
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ExpenseService } from "./expense.service";
import { AuthGuard } from "src/auth/auth.guard";
import { Request } from "express";
import { ExpenseValidation } from "./expense.validation";

interface AppRequest extends Request {
  userId: string;
}

@Controller("/api/expenses")
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @UseGuards(AuthGuard)
  @Get("/my-expenses")
  myExpenses(@Req() req: AppRequest) {
    return this.expenseService.userExpenses(req.userId);
  }

  @UseGuards(AuthGuard)
  @Post()
  addExpense(@Req() req: AppRequest, @Body() input: ExpenseValidation) {
    return this.expenseService.create(req.userId, input);
  }

  @UseGuards(AuthGuard)
  @Put("/archive/:expenseId")
  isArchived(
    @Param("expenseId") expenseId: string,
    @Query("archived", ParseBoolPipe) archived: boolean
  ) {
    return this.expenseService.archiveExpense(expenseId, archived);
  }
}
