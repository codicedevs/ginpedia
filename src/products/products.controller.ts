import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Public } from "authentication/public";
import { FindOneOptions } from "typeorm";

@Public()
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(":id")
  findOne(
    @Param("id") id: string,
    @Body() filter: FindOneOptions,
    @Query("withCombination") withCombination: string
  ) {
    console.log(withCombination);
    return this.productsService.findOne(+id, filter, !!withCombination);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productsService.remove(+id);
  }

  @Get("rating/:id")
  getRating(@Param("id") id: number) {
    const productRating = this.productsService.getRating(id);

    return productRating;
  }

  @Post(":primaryId/combinations/:secondaryId")
  async addCombination(
    @Param("primaryId") primaryId: number,
    @Param("secondaryId") secondaryId: number
  ) {
    return this.productsService.addCombination(primaryId, secondaryId);
  }
  @Delete(":primaryId/combinations/:secondaryId")
  async deleteCombination(
    @Param("primaryId") primaryId: number,
    @Param("secondaryId") secondaryId: number
  ) {
    return this.productsService.deleteCombination(primaryId, secondaryId);
  }
}
