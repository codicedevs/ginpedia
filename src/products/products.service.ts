import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { FindOneOptions, FindOptions, Repository } from "typeorm";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}
  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.save(createProductDto);
    return product;
  }

  findAll() {
    const products = this.productRepository.find();
    return products;
  }

  async findOne(id: number, filter: FindOneOptions = {}) {
    filter.where = { id };
    const product = await this.productRepository.findOneOrFail(filter);
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  async getRating(id: number) {
    const product = await this.productRepository.findOneOrFail({
      where: { id: id },
      relations: ["ratings"],
    });

    return {
      rating:
        product?.ratings
          .map((rating) => rating.rating)
          .reduce((acc, rating) => acc + rating, 0) / product.ratings.length,
    };
  }

  async addCombinations(primId: number, secId: number) {
    const primProd = await this.productRepository.findOneOrFail({
      where: { id: primId },
      relations: ["combinations"],
    });
    const secProd = await this.productRepository.findOneOrFail({
      where: { id: secId },
    });

    primProd.combinations.push(secProd);
    await this.productRepository.save(primProd);

    return primProd;
  }
}
