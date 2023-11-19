import { IsEmail, IsNotEmpty } from "class-validator";

export class SignUpValidator {
  @IsNotEmpty()
  firstName: string;
  password: string;
  @IsEmail()
  email: string;
}
