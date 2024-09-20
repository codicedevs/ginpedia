import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { AuthenticationModule } from "./authentication/authentication.module";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "./users/entities/user.entity";
import { serverSetting } from "./settings";
import { ProductsModule } from "./products/products.module";
import { Product } from "products/entities/product.entity";
import { RatingsModule } from "./ratings/ratings.module";
import { Rating } from "ratings/entities/rating.entity";
import { ConfigModule, ConfigService } from "@nestjs/config";
import typeorm from "config/typeorm";
import { BookmarksModule } from "./bookmarks/bookmarks.module";
import { Bookmark } from "bookmarks/entities/bookmark.entity";
import { join } from "path";
import { ServeStaticModule } from "@nestjs/serve-static";
import oauthConfig from "authentication/config/oauth.config";

console.log("Serving static files from:", join(__dirname, "..", "uploads"));

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "uploads"),
      serveRoot: "/uploads/",
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const typeOrmConfig =
          configService.get<TypeOrmModuleOptions>("typeorm");
        if (!typeOrmConfig) {
          throw new Error("TypeORM config is not defined");
        }
        return typeOrmConfig;
      },
    }),
    TypeOrmModule.forRoot({
      type: "postgres", // la base de datos debe ser pasada como string como aca
      host: serverSetting.DB_HOST,
      port: serverSetting.DB_PORT,
      username: serverSetting.DB_USERNAME,
      password: serverSetting.DB_PASSWORD,
      database: serverSetting.DB_DATABASE,
      entities: [User, Product, Rating, Bookmark], // las entidades (entity de typeorm)
      synchronize: true,
    }),
    ConfigModule.forFeature(oauthConfig),
    UsersModule,
    AuthenticationModule,
    ProductsModule,
    RatingsModule,
    BookmarksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
