import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
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
  canActivate(context: ExecutionContext) {
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
      const userId = payload.id;
      //აქ მინდა id ით ბაზიდან წამოვიღო ინფო და request-ს მივაბა user role

      // 5. ATTACH USER ID TO REQUESET OBJECT
      request.userId = userId;
    } catch (error) {
      console.log(error);
      return false;
    }

    return true;
  }
}
