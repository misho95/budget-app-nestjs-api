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
const roles_decoratior_1 = require("../auth/roles.decoratior");
const role_enum_1 = require("../auth/role.enum");
const role_guard_1 = require("../auth/role.guard");
let ExpenseController = class ExpenseController {
    constructor(expenseService) {
        this.expenseService = expenseService;
    }
    myExpenses(req) {
        return this.expenseService.userExpenses(req.userId);
    }
    addExpense(req, input) {
        return this.expenseService.create(req.userId, input);
    }
    editExpense(expenseId, req, input) {
        return this.expenseService.edit(expenseId, input);
    }
    deleteExpense(expenseId, req) {
        return this.expenseService.delete(expenseId);
    }
    expenseByArchived(filter) {
        return this.expenseService.getExpenseByArchived(filter);
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
    (0, common_1.Post)("/"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, expense_validation_1.ExpenseValidation]),
    __metadata("design:returntype", void 0)
], ExpenseController.prototype, "addExpense", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)("/:expenseId"),
    __param(0, (0, common_1.Param)("expenseId")),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, expense_validation_1.ExpenseValidation]),
    __metadata("design:returntype", void 0)
], ExpenseController.prototype, "editExpense", null);
__decorate([
    (0, roles_decoratior_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, common_1.Delete)("/:expenseId"),
    __param(0, (0, common_1.Param)("expenseId")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ExpenseController.prototype, "deleteExpense", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)("/archive"),
    __param(0, (0, common_1.Query)("filter", common_1.ParseBoolPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
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