"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseService = void 0;
const common_1 = require("@nestjs/common");
const expense_model_1 = require("../models/expense.model");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_model_1 = require("../models/user.model");
let ExpenseService = class ExpenseService {
    constructor(expenseModel, userModel) {
        this.expenseModel = expenseModel;
        this.userModel = userModel;
    }
    userExpenses(userId) {
        return this.expenseModel.find({ userId: userId });
    }
    async create(userId, input) {
        const user = await this.userModel.findOne({ _id: userId });
        const expense = new this.expenseModel();
        const { type, category, amount } = input;
        expense.userId = user;
        expense.type = type;
        expense.category = category;
        expense.amount = amount;
        await expense.save();
        return { status: "ok!" };
    }
    async edit(expenseId, input) {
        const { category, type, amount } = input;
        await this.expenseModel.updateOne({ _id: expenseId }, {
            $set: {
                category,
                type,
                amount,
            },
        });
        return { status: "ok!" };
    }
    async delete(expenseId) {
        await this.expenseModel.deleteOne({ _id: expenseId });
        return { Status: "ok!" };
    }
    async archiveExpense(expenseId, archived) {
        const expense = await this.expenseModel.findOne({ _id: expenseId });
        if (expense.isArchived === archived) {
            return new common_1.BadRequestException(`Expense Already ${archived ? "Archived" : "UnArchaived"} `);
        }
        await this.expenseModel.updateOne({ _id: expenseId }, { $set: { isArchived: archived } });
        return { status: "ok!" };
    }
    async getExpenseByArchived(filter) {
        return await this.expenseModel.find({ isArchived: filter });
    }
};
exports.ExpenseService = ExpenseService;
exports.ExpenseService = ExpenseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(expense_model_1.Expense.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_model_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ExpenseService);
//# sourceMappingURL=expense.service.js.map