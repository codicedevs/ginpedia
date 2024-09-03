import { ListType } from "bookmarks/entities/bookmark.entity";

export class CreateBookmarkDto {
  productId: number;
  userId: number;
  type: ListType;
}
