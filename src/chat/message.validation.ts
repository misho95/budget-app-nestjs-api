import { IsNotEmpty, IsString } from "class-validator";

export class messageValidation {
  @IsNotEmpty()
  @IsString()
  message: string;
}
