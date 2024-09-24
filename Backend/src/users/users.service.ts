import { Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { CreateUserDto, UpdateUserDto } from "./dto/user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}
  async create(createUser: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUser.password, 8);
    const userAndHashedPassword = {
      ...createUser,
      password: hashedPassword,
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
  async findByIdOrFail(id: number): Promise<User> {
    const user = await this.userRepository.findOneOrFail({
      where: { id },
      relations: ["bookmarks"],
    });
    return user;
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
      deseados: user
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
      bodega: user
        ? user.bookmarks.map((p) => p.product)
        : "Este usuario no tiene bookmarks",
    };
  }
}
