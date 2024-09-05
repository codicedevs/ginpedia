import { Module } from "@nestjs/common";
import { BookmarksService } from "./bookmarks.service";
import { BookmarksController } from "./bookmarks.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Bookmark } from "./entities/bookmark.entity";
import { User } from "users/entities/user.entity";
import { Product } from "products/entities/product.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Bookmark, User, Product])],
  controllers: [BookmarksController],
  providers: [BookmarksService],
})
export class BookmarksModule {}
