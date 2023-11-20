import { Module } from "@nestjs/common";
// import { AuthModule } from "./mongo/auth/auth.module";
import { MongooseModule } from "@nestjs/mongoose";
// import { ExpenseModule } from "./mongo/expense/expense.module";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { AuthModule } from "./graphQL/auth/auth.module";
import { ExpenseModule } from "./graphQL/expense/expense.modul";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    MongooseModule.forRoot(
      "mongodb+srv://misho95:123456789qQq@budget-app-nest.cag0885.mongodb.net/?retryWrites=true&w=majority"
    ),
    // ExpenseModule,
    // AuthModule,
    AuthModule,
    ExpenseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
