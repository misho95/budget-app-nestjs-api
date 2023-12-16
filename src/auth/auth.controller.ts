import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { InputSignIn } from "./auth.interface";
import { AuthGuard } from "./auth.guard";
import { Request } from "express";
import { User } from "src/models/user.model";
import { SignUpValidator } from "./validators/signup.validation";
import { RolesGuard } from "./role.guard";
import { Roles } from "./roles.decoratior";
import { Role } from "./role.enum";
import { ResetPasswordValidator } from "./validators/password.reset.validator";
import { CheckEmailValidator } from "./validators/check.email.validator";
import { Cron } from "@nestjs/schedule";

interface AppRequest extends Request {
  userId: string;
}

interface CustomResponse extends Response {
  cookie(name: string, value: any, options?: any): this;
}

@Controller("/api/auth")
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post("/signin")
  async signIn(
    @Body() input: InputSignIn,
    @Res({ passthrough: true }) response: CustomResponse
  ) {
    const ifToken = await this.service.signin(input);
    if (ifToken) {
      response.cookie("authToken", ifToken.accessToken, { httpOnly: true });
      return { message: "success!" };
    }
    return ifToken;
  }

  @Post("/signup")
  async signUp(
    @Body() input: SignUpValidator,
    @Res({ passthrough: true }) response: CustomResponse
  ) {
    const ifToken = await this.service.signup(input);
    if (ifToken) {
      response.cookie("authToken", ifToken.accessToken, { httpOnly: true });
      return { message: "success!" };
    }

    return ifToken;
  }

  @Post("/signout")
  clear(@Res({ passthrough: true }) response: CustomResponse) {
    response.cookie("authToken", undefined, { httpOnly: true });
    return { message: "success!" };
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
  @Get("/profile/:userId")
  profile(@Param("userId") userId: string): Promise<User> {
    return this.service.session(userId);
  }

  @UseGuards(AuthGuard)
  @Get("/users")
  users(@Req() request: AppRequest): Promise<User[]> {
    return this.service.users(request.userId);
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

  @Cron("30 * * * * *")
  handleInActiveUser() {
    this.service.deleteInActiveUsers();
  }
}
