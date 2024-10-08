import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { BookmarksService } from "./bookmarks.service";
import { CreateBookmarkDto } from "./dto/create-bookmark.dto";
import { UpdateBookmarkDto } from "./dto/update-bookmark.dto";

@Controller("bookmarks")
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Post()
  create(@Body() createBookmarkDto: CreateBookmarkDto) {
    return this.bookmarksService.createNewItemBookmark(createBookmarkDto);
  }

  @Get()
  findAll() {
    return this.bookmarksService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.bookmarksService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateBookmarkDto: UpdateBookmarkDto
  ) {
    return this.bookmarksService.update(+id, updateBookmarkDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.bookmarksService.remove(+id);
  }

  @Get("byUser/:id")
  async getUserCombinations(@Param("id") id: number) {
    return this.bookmarksService.getUserBookmarks(id);
  }
}
