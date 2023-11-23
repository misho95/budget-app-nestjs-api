import { IsEmail, IsNotEmpty } from "class-validator";

export class ResetPasswordValidator {
  @IsNotEmpty()
  password: string;
  repassword: string;
  @IsEmail()
  email: string;
}
