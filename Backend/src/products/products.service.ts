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
  Like,
  Repository,
} from "typeorm";
import { compareArrays } from "utils/utils";
import { compare } from "bcrypt";

function getKeys(obj: any): any {
  const keys: any = {};
  for (const key in obj) {
    if (typeof obj[key] === "string") keys[key] = obj[key];
    keys[key] = Like(`%${obj[key].like}%`);
  }

  return keys;
}

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly datasource: DataSource
  ) {}
  async create(createProductDto: CreateProductDto) {
    const product = await this.productRepository.save(createProductDto);
    if (createProductDto.combinations) {
      for (const comb of createProductDto.combinations) {
        this.addCombination(+product.id, +comb);
      }
    }
    return product;
  }

  async findAll(filter: FindManyOptions = {}) {
    filter.where = getKeys(filter.where);
    const products = await this.productRepository.find(filter);
    return products;
  }

  async findOne(
    id: number,
    filter: FindOneOptions = {},
    withCombination = false
  ): Promise<Product> {
    filter.where = { id };
    const product = await this.productRepository.findOneOrFail(filter);
    if (withCombination) {
      const combinations = await this.getProductCombinations(id);
      product.combinations = combinations.map(
        (combination: Product) => combination.id
      );
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

  async update(id: number, updateProductDto: UpdateProductDto) {
    //Traerme el producto por ID con el array de ID de combinations.
    const product = await this.productRepository.findOneOrFail({
      where: { id: id },
      relations: ["combinations"],
    });
    const combination = await this.getProductCombinations(id);
    //Comparar las combinations de product y del DTO
    const prev = combination.map((c: Product) => c.id);
    const curr = updateProductDto.combinations;
    const { toRemove, toAdd } = compareArrays(prev, curr);
    for (const obj of toRemove) {
      this.deleteCombination(id, obj);
    }
    for (const obj of toAdd) {
      this.addCombination(id, obj);
    }

    return product;
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
