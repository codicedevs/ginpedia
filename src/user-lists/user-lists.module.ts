import { Module } from "@nestjs/common";
import { UserListsService } from "./user-lists.service";
import { UserListsController } from "./user-lists.controller";
import { Product } from "products/entities/product.entity";
import { User } from "users/entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserProduct } from "./entities/user-list.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserProduct, Product, User])],
  controllers: [UserListsController],
  providers: [UserListsService],
})
export class UserListsModule {}
