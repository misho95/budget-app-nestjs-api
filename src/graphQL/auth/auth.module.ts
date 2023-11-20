import { Module } from "@nestjs/common";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";

@Module({
  controllers: [],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
