import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ExpenseValidation {
  @IsNotEmpty()
  @IsString()
  category: string;
  type: string;
  @IsNumber()
  amount: number;
}
