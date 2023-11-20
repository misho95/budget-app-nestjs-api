"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseService = void 0;
const common_1 = require("@nestjs/common");
let ExpenseService = class ExpenseService {
    constructor() {
        this.expenses = [
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
    }
    expense(amount, type, createdAt) {
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
    expenseById(expenseId) {
        const expenses = this.expenses;
        console.log(expenses);
        return expenses.filter((e) => e.id === expenseId);
    }
    addExpense(body) {
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
        }
        catch {
            return false;
        }
    }
    editExpense(expenseId, body) {
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
                }
                else {
                    return e;
                }
            });
            console.log("result:", this.expenses);
            return true;
        }
        catch {
            return false;
        }
    }
    deleteExpense(expenseId) {
        try {
            this.expenses = this.expenses.filter((e) => {
                if (e.id !== expenseId)
                    return e;
            });
            console.log("result:", this.expenses);
            return true;
        }
        catch {
            return false;
        }
    }
};
exports.ExpenseService = ExpenseService;
exports.ExpenseService = ExpenseService = __decorate([
    (0, common_1.Injectable)()
], ExpenseService);
//# sourceMappingURL=expense.service.js.map