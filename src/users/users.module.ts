import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { jwtSetting } from "settings";
import { UserSubscriber } from "./user.suscriber";


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtSetting.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: jwtSetting.JWT_ACCESS_EXPIRES },
    }),
  ], // necesario cuando usamos typeorm!
  controllers: [UsersController],
  providers: [UsersService, UserSubscriber], //Roles Guard
  // se importa y se pasa a providers para proteger segun el criterio de rol necesario : user o admin, en todos los controladores de este modulo
  exports: [UsersService],
})
export class UsersModule { }
