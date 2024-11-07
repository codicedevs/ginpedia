import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { FindManyOptions, Repository } from "typeorm";
import { CreateUserDto, UpdateUserDto } from "./dto/user.dto";
import { User } from "./entities/user.entity";

type UserBookmarkFormatted = {
  type: string;
  productId: number;
  bookmarkId: number;
};
type UserWithFormattedBookmarks = User & {
  formattedBookmarks?: UserBookmarkFormatted[];
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }
  async create(createUser: CreateUserDto): Promise<User> {
   let hashedPassword: string | undefined;

  // Solo hashea el password si está definido
  if (createUser.password) {
    hashedPassword = await bcrypt.hash(createUser.password, 8);
  } 

  const userAndHashedPassword = {
    ...createUser,
    password: hashedPassword, // Puede ser undefined si no hay password
  } as User;

  const user = await this.userRepository.save(userAndHashedPassword);
  return user;
  }
  /**
   * @returns
   */
  async findAll(options: FindManyOptions<User>): Promise<User[]> {
    const users = await this.userRepository.find(options);
    return users;
  }
  /**
   * @param email
   * @returns
   */
  async findOneByEmailOrFail(email: string): Promise<User> {
    const user = await this.userRepository.findOneByOrFail({ email });
    return user; // devuelve el usuario encontrado por e mail
  }
  /**
   * @param id
   * @returns
   */

  async findByIdOrFail(id: number): Promise<UserWithFormattedBookmarks> {
    const user = await this.userRepository.findOneOrFail({
      where: { id },
      relations: ["bookmarks", "bookmarks.product"],
      select: {
        bookmarks: {
          type: true,
          id: true,
          product: {
            id: true,
          },
        },
      },
    });

    if (user.bookmarks) {
      const formattedUser = {
        ...user,
        formattedBookmarks: user.bookmarks.map((bookmark) => ({
          type: bookmark.type,
          productId: bookmark.product.id,
          bookmarkId: bookmark.id,
        })),
      };
      formattedUser.bookmarks = undefined;

      return formattedUser;
    } else return user;
  }
  /**
   * @param user
   */
  /**
   * @param id
   * @param updateUser
   * @returns
   */
  async update(id: number, updateUser: UpdateUserDto): Promise<User> {
    await this.userRepository.findOneByOrFail({ id });
    // Si el DTO contiene una nueva contraseña, realiza el hash antes de actualizar
    if (updateUser.password) {
      const hashedPassword = await bcrypt.hash(updateUser.password, 8);
      updateUser.password = hashedPassword;
    }
    await this.userRepository.update(id, updateUser);
    const user = await this.userRepository.findOneByOrFail({ id });
    return user;
  }

  async delete(id: number): Promise<User> {
    // Verifica si el usuario existe antes de intentar eliminarlo
    const user = await this.userRepository.findOneByOrFail({ id });
    await this.userRepository.remove(user);
    return user;
  }

  async getProductRating(id: number) {
    const user = await this.userRepository.findOneOrFail({
      where: { id: id },
      relations: ["ratings", "ratings.productId"],
    });

    return user?.ratings.map((rating) => ({
      Producto: rating.product.type + " " + rating.product.name,
      Puntaje: rating.rating,
    }));
  }

  async getWishlist(id: number) {
    const user = await this.userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect(
        "user.bookmarks",
        "bookmarks",
        "bookmarks.type = :type",
        { type: "deseados" }
      )
      .leftJoinAndSelect("bookmarks.product", "product")
      .where("user.id = :id", { id: id })
      .select(["user.id", "bookmarks.id", "product"])
      .getOne();

    return {
      deseados: user?.bookmarks
        ? user.bookmarks.map((p) => p.product)
        : "El usuario no tiene deseados",
    };
  }

  async getPurchased(id: number) {
    const user = await this.userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect(
        "user.bookmarks",
        "bookmarks",
        "bookmarks.type = :type",
        { type: "bodega" }
      )
      .leftJoinAndSelect("bookmarks.product", "product")
      .where("user.id = :id", { id: id })
      .select(["user.id", "bookmarks.id", "product"])
      .getOne();

    return {
      bodega: user?.bookmarks
        ? user.bookmarks.map((p) => p.product)
        : "Este usuario no tiene bookmarks",
    };
  }
}
