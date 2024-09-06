import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "./dto/user.dto";
import { User } from "./entities/user.entity";
import { FindManyFilter } from "../filter/filter.dto";
import { QueryValidationPipe } from "../pipes/query-validation.pipe";
import { Role } from "../authorization/role.enum";
import { Roles } from "../authorization/role.decorator";
import { UsersService } from "./users.service";
import { Public } from "authentication/public";

//todos estos endpoint estan protegidos a nivel global por el auth guard que pide token
@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {}
  /**
   *
   * @returns
   */
  @Get()
  // @Roles(Role.Admin)
  async getAll(
    @Query(QueryValidationPipe)
    options: FindManyFilter<User>
  ) {
    if (options.where) {
      options.where = JSON.parse(options.where.toString());
    }
    const users = await this.userService.findAll(options);
    return users;
  }
  /**
   *
   * @param id
   * @returns
   */
  @Get(":id")
  async getById(@Param("id", ParseIntPipe) id: number) {
    //El ParseIntPipe se utiliza para validar y
    //transformar el parámetro de ruta id a un número entero
    const user = await this.userService.findByIdOrFail(id);
    return user;
  }
  /**
   *
   * @param createUserDto
   * @returns
   */
  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.create(createUserDto);
    return { message: "User created", user: newUser };
  }
  /**
   *
   * @param id
   * @param updateUser
   * @returns
   */
  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUser: UpdateUserDto
  ) {
    const updatedUser = await this.userService.update(id, updateUser);
    return { message: "User updated", user: updatedUser };
  }
  /**
   *
   * @param id
   * @returns
   */
  @Delete(":id")
  @Roles(Role.Admin)
  async delete(@Param("id", ParseIntPipe) id: number) {
    const deletedUser = await this.userService.delete(id);
    return { message: "User delete", user: deletedUser };
  }

  @Get("ratings/:id")
  async getRating(@Param("id") id: number) {
    return this.userService.getProductRating(id);
  }

  @Get("wishlist/:id")
  async getWishlist(@Param("id") id: number) {
    return this.userService.getWishlist(id);
  }

  @Get("purchased/:id")
  async getPurchased(@Param("id") id: number) {
    return this.userService.getPurchased(id);
  }
}
