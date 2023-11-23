import {
  Body,
  Controller,
  Delete,
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
import { OwnerGuard } from "src/auth/owner.guard";

interface AppRequest extends Request {
  userId: string;
}

@Controller("/api/expenses")
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @UseGuards(AuthGuard)
  @Get("/")
  myExpenses(@Req() req: AppRequest) {
    return this.expenseService.userExpenses(req.userId);
  }

  @UseGuards(AuthGuard)
  @Get("/sorted")
  expenseSorted(@Req() req: AppRequest) {
    return this.expenseService.expenseSorted(req.userId);
  }

  @UseGuards(AuthGuard)
  @Get("/count")
  countExpenses(
    @Req() req: AppRequest,
    @Query("type") type: string,
    @Query("value") value: string
  ) {
    return this.expenseService.countExpenses(req.userId, type, value);
  }

  @UseGuards(AuthGuard)
  @Get("/:expenseId")
  expenseById(@Req() req: AppRequest, @Param("expenseId") expenseId: string) {
    return this.expenseService.expenseById(req.userId, expenseId);
  }

  @UseGuards(AuthGuard)
  @Post("/")
  addExpense(@Req() req: AppRequest, @Body() input: ExpenseValidation) {
    return this.expenseService.create(req.userId, input);
  }

  @UseGuards(AuthGuard, OwnerGuard)
  @Put("/:expenseId")
  editExpense(
    @Param("expenseId") expenseId: string,
    @Body() input: ExpenseValidation
  ) {
    return this.expenseService.edit(expenseId, input);
  }

  @UseGuards(AuthGuard, OwnerGuard)
  @Delete("/:expenseId")
  deleteExpense(@Param("expenseId") expenseId: string) {
    return this.expenseService.delete(expenseId);
  }

  @UseGuards(AuthGuard)
  @Get("/archive")
  expenseByArchived(
    @Query("filter", ParseBoolPipe) filter: boolean,
    @Req() req: AppRequest
  ) {
    return this.expenseService.getExpenseByArchived(filter, req.userId);
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
