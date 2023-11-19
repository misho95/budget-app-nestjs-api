import { Module } from "@nestjs/common";
import { AuthModule } from "./V1/auth/auth.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ExpenseModule } from "./V1/expense/expense.module";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
    }),
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
