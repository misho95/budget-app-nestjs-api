import { Injectable } from "@nestjs/common";
import { InputCreateUser } from "./auth.types";

@Injectable()
export class AuthService {
  users() {
    return {};
  }

  user() {
    return {
      email: "misho@mail.ru",
      password: "123456",
      profile: {
        displayName: "misho95",
        settings: {
          hasEnabledSmsNotification: false,
        },
      },
    };
  }

  createUser(body: InputCreateUser) {
    console.log(body);
    return true;
  }
}
