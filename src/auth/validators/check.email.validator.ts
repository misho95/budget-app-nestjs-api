import { IsNotEmpty, IsEmail } from "class-validator";

export class CheckEmailValidator {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
