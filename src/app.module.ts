import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseModule } from './expense/expense.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://batsiashviligeorge:N574M6JGOFQpKRL6@cluster0.fhdehjq.mongodb.net/?retryWrites=true&w=majority',
    ),
    ExpenseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
