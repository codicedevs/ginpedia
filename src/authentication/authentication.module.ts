import { Module } from "@nestjs/common";
import { AuthController } from "./authentication.controller";
import { AuthService } from "./authentication.service";
import { JwtModule } from "@nestjs/jwt";
import { AuthGuard } from "./auth.guard";
import { EmailService } from "email/email.service";
import { jwtSetting } from "settings";
import { UsersModule } from "users/users.module";


@Module({
  imports: [
    JwtModule.register({
      secret: jwtSetting.JWT_ACCESS_SECRET, // secret key para JWT
      signOptions: { expiresIn: jwtSetting.JWT_ACCESS_EXPIRES }, // Configurar según tus necesidades, es el tiempo de expiracion
    }),
    UsersModule,
  ], // importo modulo de usuarios porque lo consumimos en el servicio de auth(sign In)
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, EmailService],
  exports: [AuthService],
})
export class AuthenticationModule { }
