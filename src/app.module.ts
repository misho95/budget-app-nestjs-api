import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ExpenseModule } from "./expense/expense.module";
import { ConfigModule } from "@nestjs/config";
import { ChatModule } from "./chat/chat.modul";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@budget-app-database-350cec33.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=budget-app-database`
    ),
    ExpenseModule,
    AuthModule,
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
