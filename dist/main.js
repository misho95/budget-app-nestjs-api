"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.enableCors();
    app.use(cookieParser());
    app.useGlobalPipes(new common_1.ValidationPipe());
    const port = process.env.PORT || 8080;
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map