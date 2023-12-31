import { BadRequestException, Injectable } from "@nestjs/common";
import { AuthToken, InputSignIn, InputSignUp } from "./auth.interface";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../models/user.model";
import { Model } from "mongoose";
import { hashSync, compareSync } from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { CheckEmailValidator } from "./validators/check.email.validator";
import { ResetPasswordValidator } from "./validators/password.reset.validator";
import { Expense } from "src/models/expense.model";
import { Chat } from "src/models/chat.model";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Chat.name) private ChatModel: Model<Chat>,
    @InjectModel(Expense.name) private expenseModel: Model<Expense>
  ) {}

  async session(userId: string) {
    const user = await this.userModel.findOne({
      _id: userId,
    });

    if (!user) {
      throw new BadRequestException("invalid Token");
    }

    return user;
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
    user.userName = input.username;
    user.password = hashSync(input.password);
    user.email = input.email;

    await user.save();

    // STEP. generate access token;
    const token = this.jwt.sign({ id: user.id });
    return { accessToken: token };
  }

  async checkForUserExist(input: CheckEmailValidator) {
    if (!input) {
      throw new BadRequestException("Email Required!");
    }

    const { email } = input;

    const emailExist = await this.userModel.findOne({ email });
    if (!emailExist) {
      throw new BadRequestException("This Email Is Not Exist!");
    }
    return emailExist.email;
  }

  async resetPassword(input: ResetPasswordValidator) {
    const { email, password, repassword } = input;

    const findEmail = this.userModel.findOne({ email });

    if (!findEmail) {
      throw new BadRequestException("No Email Found!");
    }

    if (password !== repassword) {
      throw new BadRequestException("Passwords Do not Match!");
    }

    const hashedPassword = hashSync(input.password);

    await this.userModel.updateOne(
      { email },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );

    return { status: "ok!" };
  }

  async deactivate(userId: string) {
    await this.userModel.updateOne(
      { _id: userId },
      {
        $set: {
          active: false,
          deactivatedAt: new Date(),
        },
      }
    );

    return { status: "ok!" };
  }

  async activate(userId: string) {
    await this.userModel.updateOne(
      { _id: userId },
      {
        $set: {
          active: true,
          deactivatedAt: null,
        },
      }
    );

    return { status: "ok!" };
  }

  async users(userId: string) {
    return await this.userModel
      .find({ _id: { $ne: userId }, active: true })
      .select("-password")
      .exec();
  }

  async deleteInActiveUsers() {
    const inactiveDocuments = await this.userModel
      .find({ active: false })
      .exec();

    if (inactiveDocuments) {
      for (const doc of inactiveDocuments) {
        const deleteDoc = await this.userModel
          .findOneAndDelete({ _id: doc._id })
          .exec();
        if (deleteDoc) {
          const userExpenses = await this.expenseModel
            .find({ userId: deleteDoc._id })
            .exec();
          for (const expense of userExpenses) {
            await this.expenseModel.findOneAndRemove({ _id: expense._id });
          }

          const clearChat = await this.ChatModel.find({
            $or: [{ sendFrom: deleteDoc._id }, { sendTo: deleteDoc._id }],
          });

          for (const chat of clearChat) {
            await this.ChatModel.findOneAndRemove({ _id: chat._id });
          }
        }
      }
    }
  }
}
