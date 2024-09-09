import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import {
  DataSource,
  FindManyOptions,
  FindOneOptions,
  FindOptions,
  Repository,
} from "typeorm";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly datasource: DataSource
  ) {}
  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.save(createProductDto);
    return product;
  }

  async findAll(filter: FindManyOptions = {}) {
    filter.relations = ["combinations"];
    const products = this.productRepository.find(filter);
    return products;
  }

  async findOne(
    id: number,
    filter: FindOneOptions = {},
    withCombination = false
  ) {
    filter.where = { id };
    const product = await this.productRepository.findOneOrFail(filter);

    if (withCombination) {
      product.combinations = await this.getProductCombinations(id);
    }
    return product;
  }

  async getProductCombinations(id: number, filter: FindOneOptions = {}) {
    //Primero Filtro de la tabla de Combinaciones los productos que en el primary o secondary tengan el valor de ID
    const query = `
      SELECT * 
      FROM combinations 
      WHERE "primaryProductId" = $1 OR "secondaryProductId" = $1 
      `;
    const result = await this.datasource.query(query, [id]);
    const filteredCombinations = result.map((combi: any) => {
      return combi.primaryProductId === id
        ? combi.secondaryProductId
        : combi.primaryProductId;
    });

    //Despues hago un join de estos codigos que estan en el array filteredCombinations para agregar el nombre
    if (filteredCombinations.length > 0) {
      const ids = filteredCombinations.join(", ");
      const productNameQuery = `
        SELECT id, name, type 
        FROM product 
        WHERE id IN (${ids})
      `;
      const final = await this.datasource.query(productNameQuery);
      return final;
    } else {
      return [];
    }
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

  async addCombination(primaryId: number, secondaryId: number) {
    const primaryProd = await this.productRepository.findOneOrFail({
      where: { id: primaryId },
      relations: ["combinations"],
    });
    const secondaryProd = await this.productRepository.findOneOrFail({
      where: { id: secondaryId },
    });
    primaryProd.combinations.push(secondaryProd);
    await this.productRepository.save(primaryProd);

    return primaryProd;
  }

  async deleteCombination(primaryId: number, secondaryId: number) {
    let primaryProd = await this.productRepository.findOneOrFail({
      where: { id: primaryId },
      relations: ["combinations"],
    });
    const secondaryProd = await this.productRepository.findOneOrFail({
      where: { id: secondaryId },
    });

    primaryProd.combinations = primaryProd.combinations.filter(
      (product) => product.id !== secondaryProd.id
    );
    await this.productRepository.save(primaryProd);

    return primaryProd;
  }
}
