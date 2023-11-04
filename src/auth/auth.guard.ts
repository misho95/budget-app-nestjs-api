import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}
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

      // 5. ATTACH USER ID TO REQUESET OBJECT
      request.userId = userId;
    } catch (error) {
      console.log(error);
      return false;
    }

    return true;
  }
}
