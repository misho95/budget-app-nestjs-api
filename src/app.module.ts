import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ExpenseModule } from "./expense/expense.module";
import { ConfigModule } from "@nestjs/config";
import { ChatModule } from "./chat/chat.modul";
import { ScheduleModule } from "@nestjs/schedule";

const mongoUrl = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@budget-app.nl70ndg.mongodb.net/`;

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(mongoUrl),
    ExpenseModule,
    AuthModule,
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
