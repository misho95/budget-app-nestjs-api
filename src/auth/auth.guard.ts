import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "src/models/user.model";
import { Model } from "mongoose";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}
  async canActivate(context: ExecutionContext) {
    // 1. REQUEST OBJECT
    const request = context.switchToHttp().getRequest();

    // 2. READ HEADERS
    const headers = request["headers"];

    // 3. EXTRACT AUTHORIZATION HEADER
    const hasTokenHeader = "authorization" in headers;
    if (!hasTokenHeader) return false;

    const token = headers["authorization"];

    try {
      // 4. TOKEN VALIDATION;
      const payload = this.jwt.verify(token);
      if (!payload) {
        new UnauthorizedException();
      }
      const userId = payload.id;
      const user = await this.userModel.findOne({ _id: userId });

      // 5. ATTACH USER ID TO REQUESET OBJECT
      request.userId = userId;
      request.user = user;
    } catch (error) {
      new UnauthorizedException();
      return false;
    }

    return true;
  }
}
