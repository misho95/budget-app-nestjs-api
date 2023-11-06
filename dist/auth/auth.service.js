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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_model_1 = require("../models/user.model");
const mongoose_2 = require("mongoose");
const bcryptjs_1 = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(jwt, userModel) {
        this.jwt = jwt;
        this.userModel = userModel;
    }
    async session(userId) {
        return this.userModel.findOne({
            _id: userId,
        });
    }
    async deleteAccount(userId) {
        return this.userModel.deleteOne({ _id: userId });
    }
    async signin(input) {
        const user = await this.userModel.findOne({
            email: input.email,
        });
        if (!user) {
            throw new common_1.BadRequestException("invalid credentials");
        }
        const passwordValid = (0, bcryptjs_1.compareSync)(input.password, user.password);
        if (!passwordValid) {
            throw new common_1.BadRequestException("invalid credentials");
        }
        const token = this.jwt.sign({ id: user.id });
        return { accessToken: token };
    }
    async signup(input) {
        let user = await this.userModel.findOne({
            email: input.email,
        });
        if (user) {
            throw new common_1.BadRequestException("email taken!");
        }
        user = new this.userModel();
        user.firstName = input.firstName;
        user.password = (0, bcryptjs_1.hashSync)(input.password);
        user.email = input.email;
        await user.save();
        const token = this.jwt.sign({ id: user.id });
        return { accessToken: token };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(user_model_1.User.name)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        mongoose_2.Model])
], AuthService);
//# sourceMappingURL=auth.service.js.map