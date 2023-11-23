import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthToken, InputSignIn } from "./auth.interface";
import { AuthGuard } from "./auth.guard";
import { Request } from "express";
import { User } from "src/models/user.model";
import { SignUpValidator } from "./validators/signup.validation";
import { RolesGuard } from "./role.guard";
import { Roles } from "./roles.decoratior";
import { Role } from "./role.enum";
import { ResetPasswordValidator } from "./validators/password.reset.validator";
import { CheckEmailValidator } from "./validators/check.email.validator";
import { request } from "http";

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

  @Get("/checkemail")
  checkEmail(@Body() input: CheckEmailValidator) {
    return this.service.checkForUserExist(input);
  }

  @Put("/resetpassword")
  resetPassword(@Body() input: ResetPasswordValidator) {
    return this.service.resetPassword(input);
  }

  @UseGuards(AuthGuard)
  @Get("/session")
  session(@Req() request: AppRequest): Promise<User> {
    return this.service.session(request.userId);
  }

  @UseGuards(AuthGuard)
  @Put("/deactivate")
  deactivate(@Req() request: AppRequest) {
    return this.service.deactivate(request.userId);
  }

  @UseGuards(AuthGuard)
  @Put("/activate")
  activate(@Req() request: AppRequest) {
    return this.service.activate(request.userId);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete("/:userId")
  deleteAccount(@Param("userId") userId: string) {
    return this.service.deleteAccount(userId);
  }
}
