import { Injectable } from "@nestjs/common";
import { CreateBookmarkDto } from "./dto/create-bookmark.dto";
import { UpdateBookmarkDto } from "./dto/update-bookmark.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Bookmark } from "./entities/bookmark.entity";
import { Repository } from "typeorm";
import { Product } from "products/entities/product.entity";
import { User } from "users/entities/user.entity";

@Injectable()
export class BookmarksService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly bookmarkRepository: Repository<Bookmark>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}
  create(createBookmarkDto: CreateBookmarkDto) {
    return "This action adds a new bookmark";
  }

  findAll() {
    return `This action returns all bookmarks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookmark`;
  }

  update(id: number, updateBookmarkDto: UpdateBookmarkDto) {
    return `This action updates a #${id} bookmark`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookmark`;
  }

  async createNewItemBookmark(createNewItemBookmarkDto) {
    const { productId, userId, type } = createNewItemBookmarkDto;
    const product = await this.productRepository.findOneByOrFail({
      id: productId,
    });
    const user = await this.userRepository.findOneByOrFail({ id: userId });

    console.log(
      `El usuario ${user.name} agrego a ${type} el producto ${product.type} ${product.name}`
    );

    return this.bookmarkRepository.save({
      product: product,
      user: user,
      type,
    });
  }
}
