import { Module } from "@nestjs/common";
import { RatingsService } from "./ratings.service";
import { RatingsController } from "./ratings.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Rating } from "./entities/rating.entity";
import { Product } from "products/entities/product.entity";
import { User } from "users/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Rating, Product, User])],
  controllers: [RatingsController],
  providers: [RatingsService],
})
export class RatingsModule {}
