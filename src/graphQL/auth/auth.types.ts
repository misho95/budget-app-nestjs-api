import { Field, ObjectType, InputType } from "@nestjs/graphql";

@InputType()
export class InputCreateUser {
  @Field(() => String)
  email: string;
  @Field(() => String)
  password: string;
}

@ObjectType()
export class Settings {
  @Field(() => Boolean, { nullable: true })
  hasEnabledSmsNotification: boolean;
}

@ObjectType()
export class Profile {
  @Field(() => String, { nullable: true })
  displayName?: string;
  @Field(() => Settings, { nullable: true })
  settings: Settings;
}

@ObjectType()
export class User {
  @Field(() => String)
  id?: string;
  @Field(() => String)
  email?: string;
  @Field(() => String)
  password?: string;
  @Field(() => Profile, { nullable: true })
  profile?: Profile;
}
