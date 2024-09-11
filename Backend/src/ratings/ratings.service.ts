import { HttpException, Injectable } from "@nestjs/common";
import { CreateRatingDto } from "./dto/create-rating.dto";
import { UpdateRatingDto } from "./dto/update-rating.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Rating } from "./entities/rating.entity";
import { Product } from "products/entities/product.entity";
import { User } from "users/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async createRating(createRatingDto: CreateRatingDto) {
    const { productId, userId, rating } = createRatingDto;
    const ratingExists = await this.ratingRepository.findOne({
      where: { product: { id: productId }, user: { id: userId } },
    });
    if (ratingExists) throw new HttpException("Rating already exists", 409);
    const product = await this.productRepository.findOneOrFail({
      where: { id: productId },
      relations: ["ratings"],
    });
    const ratingFinal = product.rating
      ? (product.ratings.length * product.rating + rating) /
        (product.ratings.length + 1)
      : rating;
    const user = await this.userRepository.findOneByOrFail({ id: userId });
    await this.ratingRepository.save({
      product: product,
      user: user,
      rating,
    });
    await this.productRepository.update(
      { id: productId },
      { rating: ratingFinal }
    );
    return { productId, userId, rating };
  }

  findAll() {
    return `This action returns all ratings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rating`;
  }

  update(id: number, updateRatingDto: UpdateRatingDto) {
    return `This action updates a #${id} rating`;
  }

  remove(id: number) {
    return `This action removes a #${id} rating`;
  }
}
