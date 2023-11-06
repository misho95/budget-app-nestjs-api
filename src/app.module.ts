import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ExpenseModule } from "./expense/expense.module";

@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://misho95:123456789qQq@budget-app-nest.cag0885.mongodb.net/?retryWrites=true&w=majority"
    ),
    ExpenseModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
