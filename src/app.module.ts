import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ExpenseModule } from "./expense/expense.module";
import { RolesGuard } from "src/auth/role.guard";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth/auth.guard";

@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://misho95:123456789qQq@budget-app-nest.cag0885.mongodb.net/?retryWrites=true&w=majority"
    ),
    ExpenseModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
