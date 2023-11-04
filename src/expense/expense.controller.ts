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
import { Roles } from "src/auth/roles.decoratior";
import { Role } from "src/auth/role.enum";
import { RolesGuard } from "src/auth/role.guard";

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
  @Post("/")
  addExpense(@Req() req: AppRequest, @Body() input: ExpenseValidation) {
    return this.expenseService.create(req.userId, input);
  }

  @UseGuards(AuthGuard)
  @Put("/:expenseId")
  editExpense(
    @Param("expenseId") expenseId: string,
    @Req() req: AppRequest,
    @Body() input: ExpenseValidation
  ) {
    return this.expenseService.edit(expenseId, input);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete("/:expenseId")
  deleteExpense(@Param("expenseId") expenseId: string, @Req() req: AppRequest) {
    return this.expenseService.delete(expenseId);
  }

  @UseGuards(AuthGuard)
  @Get("/archive")
  expenseByArchived(@Query("filter", ParseBoolPipe) filter: boolean) {
    return this.expenseService.getExpenseByArchived(filter);
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
