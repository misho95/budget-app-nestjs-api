import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthToken, InputSignIn } from "./auth.interface";
import { AuthGuard } from "./auth.guard";
import { Request } from "express";
import { User } from "src/models/user.model";
import { SignUpValidator } from "./signup.validation";

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
}
