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
exports.ExpenseController = void 0;
const common_1 = require("@nestjs/common");
const expense_service_1 = require("./expense.service");
const auth_guard_1 = require("../auth/auth.guard");
const expense_validation_1 = require("./expense.validation");
const owner_guard_1 = require("../auth/owner.guard");
let ExpenseController = class ExpenseController {
    constructor(expenseService) {
        this.expenseService = expenseService;
    }
    myExpenses(req) {
        return this.expenseService.userExpenses(req.userId);
    }
    expenseSorted(req) {
        return this.expenseService.expenseSorted(req.userId);
    }
    countExpenses(req, type, value) {
        return this.expenseService.countExpenses(req.userId, type, value);
    }
    searchExpenses(req, type, category, min_amount, max_amount, date_from, date_to) {
        return this.expenseService.searchExpenses(req.userId, type, category, min_amount, max_amount, date_from, date_to);
    }
    expenseById(req, expenseId) {
        return this.expenseService.expenseById(req.userId, expenseId);
    }
    addExpense(req, input) {
        return this.expenseService.create(req.userId, input);
    }
    editExpense(expenseId, input) {
        return this.expenseService.edit(expenseId, input);
    }
    deleteExpense(expenseId) {
        return this.expenseService.delete(expenseId);
    }
    expenseByArchived(filter, req) {
        return this.expenseService.getExpenseByArchived(filter, req.userId);
    }
    isArchived(expenseId, archived) {
        return this.expenseService.archiveExpense(expenseId, archived);
    }
};
exports.ExpenseController = ExpenseController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)("/"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ExpenseController.prototype, "myExpenses", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)("/sorted"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ExpenseController.prototype, "expenseSorted", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)("/count"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("type")),
    __param(2, (0, common_1.Query)("value")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], ExpenseController.prototype, "countExpenses", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)("/search"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("type")),
    __param(2, (0, common_1.Query)("category")),
    __param(3, (0, common_1.Query)("min_amount")),
    __param(4, (0, common_1.Query)("max_amount")),
    __param(5, (0, common_1.Query)("date_from")),
    __param(6, (0, common_1.Query)("date_to")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Number, Number, String, String]),
    __metadata("design:returntype", void 0)
], ExpenseController.prototype, "searchExpenses", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)("/:expenseId"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("expenseId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ExpenseController.prototype, "expenseById", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)("/"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, expense_validation_1.ExpenseValidation]),
    __metadata("design:returntype", void 0)
], ExpenseController.prototype, "addExpense", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, owner_guard_1.OwnerGuard),
    (0, common_1.Put)("/:expenseId"),
    __param(0, (0, common_1.Param)("expenseId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, expense_validation_1.ExpenseValidation]),
    __metadata("design:returntype", void 0)
], ExpenseController.prototype, "editExpense", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, owner_guard_1.OwnerGuard),
    (0, common_1.Delete)("/:expenseId"),
    __param(0, (0, common_1.Param)("expenseId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExpenseController.prototype, "deleteExpense", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)("/archive"),
    __param(0, (0, common_1.Query)("filter", common_1.ParseBoolPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, Object]),
    __metadata("design:returntype", void 0)
], ExpenseController.prototype, "expenseByArchived", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)("/archive/:expenseId"),
    __param(0, (0, common_1.Param)("expenseId")),
    __param(1, (0, common_1.Query)("archived", common_1.ParseBoolPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", void 0)
], ExpenseController.prototype, "isArchived", null);
exports.ExpenseController = ExpenseController = __decorate([
    (0, common_1.Controller)("/api/expenses"),
    __metadata("design:paramtypes", [expense_service_1.ExpenseService])
], ExpenseController);
//# sourceMappingURL=expense.controller.js.map