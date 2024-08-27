import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { AuthenticationModule } from "./authentication/authentication.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/entities/user.entity";
import { serverSetting } from "./settings";
import { ProductsModule } from "./products/products.module";
import { Product } from "products/entities/product.entity";
import { RatingsModule } from "./ratings/ratings.module";
import { Rating } from "ratings/entities/rating.entity";
import { ConfigModule, ConfigService } from "@nestjs/config";
import typeorm from "config/typeorm";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get("typeorm"),
    }),
    TypeOrmModule.forRoot({
      type: "postgres", // la base de datos debe ser pasada como string como aca
      host: serverSetting.DB_HOST,
      port: serverSetting.DB_PORT,
      username: serverSetting.DB_USERNAME,
      password: serverSetting.DB_PASSWORD,
      database: serverSetting.DB_DATABASE,
      entities: [User, Product, Rating], // las entidades (entity de typeorm)
      synchronize: false,
    }),
    UsersModule,
    AuthenticationModule,
    ProductsModule,
    RatingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
