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
exports.ExpenseResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const expense_types_1 = require("./expense.types");
const expense_service_1 = require("./expense.service");
let ExpenseResolver = class ExpenseResolver {
    constructor(expenseService) {
        this.expenseService = expenseService;
    }
    expense(amount, type, createdAt) {
        return this.expenseService.expense(amount, type, createdAt);
    }
    expenseById(expenseId) {
        return this.expenseService.expenseById(expenseId);
    }
    addExpense(body) {
        return this.expenseService.addExpense(body);
    }
    editExpense(expenseId, body) {
        return this.expenseService.editExpense(expenseId, body);
    }
    deleteExpense(expenseId) {
        return this.expenseService.deleteExpense(expenseId);
    }
};
exports.ExpenseResolver = ExpenseResolver;
__decorate([
    (0, graphql_1.Query)(() => [expense_types_1.ExpenseType]),
    __param(0, (0, graphql_1.Args)("amount", { nullable: true })),
    __param(1, (0, graphql_1.Args)("type", { nullable: true })),
    __param(2, (0, graphql_1.Args)("createdAt", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", void 0)
], ExpenseResolver.prototype, "expense", null);
__decorate([
    (0, graphql_1.Query)(() => [expense_types_1.ExpenseType]),
    __param(0, (0, graphql_1.Args)("expenseId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExpenseResolver.prototype, "expenseById", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)("body")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [expense_types_1.ExpenseInputType]),
    __metadata("design:returntype", void 0)
], ExpenseResolver.prototype, "addExpense", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)("expenseId")),
    __param(1, (0, graphql_1.Args)("body")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, expense_types_1.ExpenseEditInputType]),
    __metadata("design:returntype", void 0)
], ExpenseResolver.prototype, "editExpense", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)("expenseId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExpenseResolver.prototype, "deleteExpense", null);
exports.ExpenseResolver = ExpenseResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [expense_service_1.ExpenseService])
], ExpenseResolver);
//# sourceMappingURL=expense.resolver.js.map