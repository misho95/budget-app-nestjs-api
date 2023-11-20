import { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/mongo/models/user.model";
import { Model } from "mongoose";
export declare class AuthGuard implements CanActivate {
    private readonly jwt;
    private userModel;
    constructor(jwt: JwtService, userModel: Model<User>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
