import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT || 8080;
  await app.listen(port);
}
bootstrap();
