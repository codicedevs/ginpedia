import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  DataSource,
  FindManyOptions,
  FindOneOptions,
  ILike,
  Like,
  Repository,
} from "typeorm";
import { compareArrays } from "utils/utils";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./entities/product.entity";

type TransformatedRating = { [key: number]: number };

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
    const products = await this.productRepository.find(filter);
    return products;
  }

  async findOne(
    id: number,
    filter: FindOneOptions = {},
    withCombination = false
  ): Promise<Product & { ratingList: TransformatedRating[] }> {
    filter.where = { id };
    filter.relations = ["ratings"];
    const product = await this.productRepository.findOneOrFail(filter);

    const transformatedRankings: TransformatedRating[] = [];
    if (product.ratings) {
      for (let i = 1; i <= 5; i++) {
        transformatedRankings.push({
          [i]: product.ratings.filter((rat) => rat.rating === i).length,
        });
      }
    }
    if (withCombination) {
      const combinations = await this.getProductCombinations(id);
      product.combinations = combinations;
    }
    product.ratings = undefined;

    return { ...product, ratingList: transformatedRankings };
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

  async update(sourceId: number, updateProductDto: UpdateProductDto) {
    //Traerme el producto por ID con el array de ID de combinations.
    const product = await this.productRepository.findOneOrFail({
      where: { id: sourceId },
      relations: ["combinations"],
    });
    const combination = await this.getProductCombinations(sourceId);
    //Comparar las combinations de product y del DTO
    const prev = combination.map((c: Product) => c.id);
    const curr = updateProductDto.combinations || [];
    const { toRemove, toAdd } = compareArrays(prev, curr);

    for (const target of toRemove) {
      this.deleteCombination(sourceId, target);
    }
    for (const target of toAdd) {
      this.addCombination(sourceId, target);
    }
    delete updateProductDto.combinations;
    this.productRepository.update(
      sourceId,
      updateProductDto as Partial<Product>
    );

    return product;
  }

  remove(id: number) {
    return this.productRepository.delete(id);
  }

  async getRating(id: number) {
    const product = await this.productRepository.findOneOrFail({
      where: { id: id },
      relations: ["ratings"],
    });

    if (!product.ratings) return;
    return {
      rating:
        product?.ratings
          .map((rating) => rating.rating)
          .reduce((acc, rating) => acc + rating, 0) / product.ratings.length,
    };
  }

  async addCombination(primaryId: number, secondaryId: number) {
    if (primaryId === secondaryId)
      throw new HttpException("No se puede combinar con si mismo", 406);
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

  async uploadFile(id: number, fileName: string) {
    await this.productRepository.update(id, { image: fileName });
  }
}
