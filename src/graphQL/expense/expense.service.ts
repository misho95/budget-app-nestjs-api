import { Injectable } from "@nestjs/common";
import { ExpenseInputType, ExpenseType } from "./expense.types";

@Injectable()
export class ExpenseService {
  private expenses: ExpenseType[] = [
    {
      id: "1",
      amount: 200,
      createdAt: "20/05/1995",
      type: "expense",
      category: "shopping",
    },
    {
      id: "2",
      amount: 400,
      createdAt: "20/05/1995",
      type: "expense",
      category: "gym",
    },
    {
      id: "3",
      amount: 700,
      createdAt: "20/05/1995",
      type: "income",
      category: "invoice",
    },
  ];

  expense(amount: number, type: string, createdAt: string) {
    const expenses = this.expenses;
    if (!amount && !type && !createdAt) {
      return expenses;
    }

    return expenses.filter((e) => {
      const isDateMatched = !createdAt || e.createdAt === createdAt;
      const isAmountMatched = !amount || e.amount === amount;
      const isTypeMatched = !type || e.type === type;
      return isAmountMatched && isTypeMatched && isDateMatched;
    });
  }

  expenseById(expenseId: string) {
    const expenses = this.expenses;
    console.log(expenses);
    return expenses.filter((e) => e.id === expenseId);
  }

  addExpense(body: ExpenseInputType) {
    const { amount, type, category } = body;

    const newExpense = {
      id: new Date().getTime().toString(),
      amount,
      createdAt: new Date().toString(),
      type,
      category,
    };

    try {
      this.expenses.push(newExpense);
      console.log("result:", this.expenses);
      return true;
    } catch {
      return false;
    }
  }

  editExpense(expenseId: string, body: ExpenseInputType) {
    const { amount, type, category } = body;

    try {
      this.expenses = this.expenses.map((e) => {
        if (e.id === expenseId) {
          return {
            ...e,
            amount: amount ? amount : e.amount,
            type: type ? type : e.type,
            category: category ? category : e.category,
          };
        } else {
          return e;
        }
      });
      console.log("result:", this.expenses);
      return true;
    } catch {
      return false;
    }
  }

  deleteExpense(expenseId: string) {
    try {
      this.expenses = this.expenses.filter((e) => {
        if (e.id !== expenseId) return e;
      });
      console.log("result:", this.expenses);
      return true;
    } catch {
      return false;
    }
  }
}
