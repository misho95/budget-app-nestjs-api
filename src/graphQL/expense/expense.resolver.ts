import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import {
  ExpenseEditInputType,
  ExpenseInputType,
  ExpenseType,
} from "./expense.types";
import { ExpenseService } from "./expense.service";

@Resolver()
export class ExpenseResolver {
  constructor(private expenseService: ExpenseService) {}

  @Query(() => [ExpenseType])
  expense(
    @Args("amount", { nullable: true }) amount: number,
    @Args("type", { nullable: true }) type: string,
    @Args("createdAt", { nullable: true }) createdAt: string
  ) {
    return this.expenseService.expense(amount, type, createdAt);
  }

  @Query(() => [ExpenseType])
  expenseById(@Args("expenseId") expenseId: string) {
    return this.expenseService.expenseById(expenseId);
  }

  @Mutation(() => Boolean)
  addExpense(@Args("body") body: ExpenseInputType) {
    return this.expenseService.addExpense(body);
  }

  @Mutation(() => Boolean)
  editExpense(
    @Args("expenseId") expenseId: string,
    @Args("body") body: ExpenseEditInputType
  ) {
    return this.expenseService.editExpense(expenseId, body);
  }
  @Mutation(() => Boolean)
  deleteExpense(@Args("expenseId") expenseId: string) {
    return this.expenseService.deleteExpense(expenseId);
  }
}
