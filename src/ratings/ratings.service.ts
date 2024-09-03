import { Injectable } from "@nestjs/common";
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
    const product = await this.productRepository.findOneByOrFail({
      id: productId,
    });
    const user = await this.userRepository.findOneByOrFail({ id: userId });

    this.ratingRepository.save({
      productId: product,
      userId: user,
      rating,
    });

    return `El usuario ${user.name} le puso ${rating} estrellas al ${product.type} ${product.name}`;
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
