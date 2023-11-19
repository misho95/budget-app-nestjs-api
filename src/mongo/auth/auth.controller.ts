import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthToken, InputSignIn } from "./auth.interface";
import { AuthGuard } from "./auth.guard";
import { Request } from "express";
import { User } from "src/V1/models/user.model";
import { SignUpValidator } from "./signup.validation";
import { RolesGuard } from "./role.guard";
import { Roles } from "./roles.decoratior";
import { Role } from "./role.enum";

interface AppRequest extends Request {
  userId: string;
}

@Controller("/api/auth")
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post("/signin")
  signIn(@Body() input: InputSignIn): Promise<AuthToken> {
    return this.service.signin(input);
  }

  @Post("/signup")
  signUp(@Body() input: SignUpValidator): Promise<AuthToken> {
    return this.service.signup(input);
  }

  @UseGuards(AuthGuard)
  @Get("/session")
  session(@Req() request: AppRequest): Promise<User> {
    return this.service.session(request.userId);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete("/:userId")
  deleteAccount(@Param("userId") userId: string) {
    return this.service.deleteAccount(userId);
  }
}
