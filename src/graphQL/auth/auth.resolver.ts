import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { InputCreateUser, User } from "./auth.types";

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => User)
  user(@Args("userId") userId: string) {
    return this.authService.user(userId);
  }

  @Mutation(() => Boolean)
  createUser(@Args("body") body: InputCreateUser) {
    return this.authService.createUser(body);
  }
}
