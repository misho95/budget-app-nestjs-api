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
exports.User = exports.Profile = exports.Settings = exports.InputCreateUser = void 0;
const graphql_1 = require("@nestjs/graphql");
let InputCreateUser = class InputCreateUser {
};
exports.InputCreateUser = InputCreateUser;
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], InputCreateUser.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], InputCreateUser.prototype, "password", void 0);
exports.InputCreateUser = InputCreateUser = __decorate([
    (0, graphql_1.InputType)()
], InputCreateUser);
let Settings = class Settings {
};
exports.Settings = Settings;
__decorate([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], Settings.prototype, "hasEnabledSmsNotification", void 0);
exports.Settings = Settings = __decorate([
    (0, graphql_1.ObjectType)()
], Settings);
let Profile = class Profile {
};
exports.Profile = Profile;
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "displayName", void 0);
__decorate([
    (0, graphql_1.Field)(() => Settings, { nullable: true }),
    __metadata("design:type", Settings)
], Profile.prototype, "settings", void 0);
exports.Profile = Profile = __decorate([
    (0, graphql_1.ObjectType)()
], Profile);
let User = class User {
};
exports.User = User;
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, graphql_1.Field)(() => Profile, { nullable: true }),
    __metadata("design:type", Profile)
], User.prototype, "profile", void 0);
exports.User = User = __decorate([
    (0, graphql_1.ObjectType)()
], User);
//# sourceMappingURL=auth.types.js.map