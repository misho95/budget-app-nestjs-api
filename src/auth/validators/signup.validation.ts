import { IsEmail, IsNotEmpty } from "class-validator";

export class SignUpValidator {
  @IsNotEmpty()
  firstName: string;
  username: string;
  password: string;
  @IsEmail()
  email: string;
}
