import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { UserListsService } from "./user-lists.service";
import { CreateUserListDto } from "./dto/create-user-list.dto";
import { UpdateUserListDto } from "./dto/update-user-list.dto";

@Controller("user-lists")
export class UserListsController {
  constructor(private readonly userListsService: UserListsService) {}

  @Post()
  createNewItem(@Body() createUserListDto) {
    return this.userListsService.createNewItemList(createUserListDto);
  }

  @Get()
  findAll() {
    return this.userListsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userListsService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateUserListDto: UpdateUserListDto
  ) {
    return this.userListsService.update(+id, updateUserListDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userListsService.remove(+id);
  }
}
