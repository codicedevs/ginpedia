import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { AuthenticationModule } from "./authentication/authentication.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/entities/user.entity";
import { serverSetting } from "./settings";
import { ProductsModule } from "./products/products.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres", // la base de datos debe ser pasada como string como aca
      host: serverSetting.DB_HOST,
      port: serverSetting.DB_PORT,
      username: serverSetting.DB_USERNAME,
      password: serverSetting.DB_PASSWORD,
      database: serverSetting.DB_DATABASE,
      entities: [User], // las entidades (entity de typeorm)
      synchronize: true,
    }),
    UsersModule,
    AuthenticationModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService], //
})
export class AppModule {}
