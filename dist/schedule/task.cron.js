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
var TaskCron_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskCron = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
let TaskCron = TaskCron_1 = class TaskCron {
    constructor() {
        this.logger = new common_1.Logger(TaskCron_1.name);
    }
    handleInActiveUsers() {
        this.logger.debug("Called");
    }
};
exports.TaskCron = TaskCron;
__decorate([
    (0, schedule_1.Cron)("10 * * * * *"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TaskCron.prototype, "handleInActiveUsers", null);
exports.TaskCron = TaskCron = TaskCron_1 = __decorate([
    (0, common_1.Injectable)()
], TaskCron);
//# sourceMappingURL=task.cron.js.map