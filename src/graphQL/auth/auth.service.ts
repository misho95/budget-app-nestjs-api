import { Injectable } from "@nestjs/common";
import { InputCreateUser, User } from "./auth.types";

@Injectable()
export class AuthService {
  private users: User[] = [
    {
      id: "1",
      email: "misho@mail.ru",
      password: "123456",
      profile: {
        displayName: "misho95",
        settings: {
          hasEnabledSmsNotification: false,
        },
      },
    },
  ];

  user(userId: string) {
    return this.users.find((u) => u.id === userId);
  }

  createUser(body: InputCreateUser) {
    const { email, password } = body;
    const newUser = {
      id: new Date().getTime().toString(),
      email,
      password,
      profile: null,
    };

    this.users.push(newUser);
    console.log(this.users);
    return true;
  }
}
