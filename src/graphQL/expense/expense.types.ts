import { Field, ObjectType, InputType, Int } from "@nestjs/graphql";

@InputType()
export class ExpenseInputType {
  @Field(() => String)
  amount: number;
  @Field(() => String)
  type: string;
  @Field(() => String)
  category: string;
}

@InputType()
export class ExpenseEditInputType {
  @Field(() => String, { nullable: true })
  amount: number;
  @Field(() => String, { nullable: true })
  type: string;
  @Field(() => String, { nullable: true })
  category: string;
}

@ObjectType()
export class ExpenseType {
  @Field(() => String, { nullable: true })
  id?: string;
  @Field(() => Int, { nullable: true })
  amount: number;
  @Field(() => String, { nullable: true })
  createdAt: String;
  @Field(() => String, { nullable: true })
  type: string;
  @Field(() => String, { nullable: true })
  category: string;
}
