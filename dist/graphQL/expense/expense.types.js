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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseType = exports.ExpenseEditInputType = exports.ExpenseInputType = void 0;
const graphql_1 = require("@nestjs/graphql");
let ExpenseInputType = class ExpenseInputType {
};
exports.ExpenseInputType = ExpenseInputType;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ExpenseInputType.prototype, "amount", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ExpenseInputType.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ExpenseInputType.prototype, "category", void 0);
exports.ExpenseInputType = ExpenseInputType = __decorate([
    (0, graphql_1.InputType)()
], ExpenseInputType);
let ExpenseEditInputType = class ExpenseEditInputType {
};
exports.ExpenseEditInputType = ExpenseEditInputType;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], ExpenseEditInputType.prototype, "amount", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], ExpenseEditInputType.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], ExpenseEditInputType.prototype, "category", void 0);
exports.ExpenseEditInputType = ExpenseEditInputType = __decorate([
    (0, graphql_1.InputType)()
], ExpenseEditInputType);
let ExpenseType = class ExpenseType {
};
exports.ExpenseType = ExpenseType;
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], ExpenseType.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], ExpenseType.prototype, "amount", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], ExpenseType.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], ExpenseType.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], ExpenseType.prototype, "category", void 0);
exports.ExpenseType = ExpenseType = __decorate([
    (0, graphql_1.ObjectType)()
], ExpenseType);
//# sourceMappingURL=expense.types.js.map