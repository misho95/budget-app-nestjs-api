import { BadRequestException, Injectable } from "@nestjs/common";
import { AuthToken, InputSignIn, InputSignUp } from "./auth.interface";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../models/user.model";
import { Model } from "mongoose";
import { hashSync, compareSync } from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { Expense } from "src/models/expense.model";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async session(userId: string) {
    return this.userModel.findOne({
      _id: userId,
    });
  }

  async deleteAccount(userId: string) {
    return this.userModel.deleteOne({ _id: userId });
  }

  async signin(input: InputSignIn): Promise<AuthToken> {
    const user = await this.userModel.findOne({
      email: input.email,
    });

    if (!user) {
      throw new BadRequestException("invalid credentials");
    }

    const passwordValid = compareSync(input.password, user.password);
    if (!passwordValid) {
      throw new BadRequestException("invalid credentials");
    }

    const token = this.jwt.sign({ id: user.id });
    return { accessToken: token };
  }

  async signup(input: InputSignUp): Promise<AuthToken> {
    let user = await this.userModel.findOne({
      email: input.email,
    });

    if (user) {
      throw new BadRequestException("email taken!");
    }

    user = new this.userModel();
    user.firstName = input.firstName;
    user.password = hashSync(input.password);
    user.email = input.email;

    await user.save();

    // STEP. generate access token;
    const token = this.jwt.sign({ id: user.id });
    return { accessToken: token };
  }
}
