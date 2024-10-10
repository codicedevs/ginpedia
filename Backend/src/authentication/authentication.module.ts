import { Module } from "@nestjs/common";
import { AuthController } from "./authentication.controller";
import { AuthService } from "./authentication.service";
import { JwtModule } from "@nestjs/jwt";
import { AuthGuard } from "./auth.guard";
import { EmailService } from "email/email.service";
import { jwtSetting } from "settings";
import { UsersModule } from "users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "users/entities/user.entity";
import { GoogleStrategy } from "strategies/google.strategy";
import { ConfigModule } from "@nestjs/config";
import { FacebookStrategy } from "strategies/facebook.strategy";
import oauthConfig from "./config/oauth.config";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: jwtSetting.JWT_ACCESS_SECRET, // secret key para JWT
      signOptions: { expiresIn: jwtSetting.JWT_ACCESS_EXPIRES }, // Configurar según tus necesidades, es el tiempo de expiracion
    }),
    ConfigModule.forFeature(oauthConfig),
    UsersModule,
  ], // importo modulo de usuarios porque lo consumimos en el servicio de auth(sign In)
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthGuard,
    EmailService,
    GoogleStrategy,
    FacebookStrategy,
  ],
  exports: [AuthService],
})
export class AuthenticationModule {}
