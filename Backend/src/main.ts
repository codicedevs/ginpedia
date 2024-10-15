import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { serverSetting } from "./settings";
import { GlobalExceptionFilter } from "./globalexception/global.exception.filter";
import { AuthGuard } from "./authentication/auth.guard";
import { JwtService } from "@nestjs/jwt";
import { RolesGuard } from "authorization/roles.guard";
import { CountInterceptor } from "interceptors/count.interceptor";
import { ConnectionSource } from "config/typeorm";
import * as cors from "cors";
import { ParseWhereInterceptor } from "interceptors/parseWhere.interceptor";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  await ConnectionSource.initialize();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }) // no permite campos adicionales,comentado porque me vuelve loco en postman
  app.useGlobalGuards(
    new AuthGuard(new JwtService(), new Reflector()),
    new RolesGuard(new Reflector())
  );
  // app.useGlobalFilters(new GlobalExceptionFilter()); // maneja errores de request
  app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "Range"],
      exposedHeaders: ["Content-Range", "X-Total-Count"],
    })
  );
  app.useGlobalInterceptors(
    new CountInterceptor(),
    new ParseWhereInterceptor()
  );
  await app.listen(serverSetting.PORT, "0.0.0.0", () => {
    console.log("corriendo en ", serverSetting.PORT);
  });
}
bootstrap();
