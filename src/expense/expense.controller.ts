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
  @Get("/search")
  searchExpenses(
    @Req() req: AppRequest,
    @Query("type") type: string,
    @Query("category") category: string,
    @Query("min_amount") min_amount: number,
    @Query("max_amount") max_amount: number,
    @Query("date_from") date_from: string,
    @Query("date_to") date_to: string
  ) {
    return this.expenseService.searchExpenses(
      req.userId,
      type,
      category,
      min_amount,
      max_amount,
      date_from,
      date_to
    );
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

  @Put("/archive/:expenseId")
  isArchived(
    @Param("expenseId") expenseId: string,
    @Query("archived", ParseBoolPipe) archived: boolean
  ) {
    return this.expenseService.archiveExpense(expenseId, archived);
  }
}
