import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { serverSetting } from "./settings";
import { GlobalExceptionFilter } from "./globalexception/global.exception.filter";
import { AuthGuard } from "./authentication/auth.guard";
import { JwtService } from "@nestjs/jwt";
import { RolesGuard } from "authorization/roles.guard";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes();
  // new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }) // no permite campos adicionales,comentado porque me vuelve loco en postman
  app.useGlobalGuards(
    new AuthGuard(new JwtService(), new Reflector()),
    new RolesGuard(new Reflector())
  );
  app.useGlobalFilters(new GlobalExceptionFilter()); // maneja errores de request
  await app.listen(serverSetting.PORT);
}
bootstrap();
