import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
  UseInterceptors,
  Bind,
  UploadedFile,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Public } from "authentication/public";
import { FindManyOptions, FindOneOptions } from "typeorm";
import { Product } from "./entities/product.entity";
import { QueryValidationPipe } from "pipes/query-validation.pipe";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";

@Public()
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post(":id/upload")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    })
  )
  @Bind(UploadedFile())
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param("id") id: number
  ) {
    await this.productsService.uploadFile(id, file.path);
    return "se agrego la foto correctamente";
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(
    @Query(QueryValidationPipe)
    options: FindManyOptions
  ) {
    console.log(options);
    return this.productsService.findAll(options);
  }

  @Get(":id")
  findOne(
    @Param("id") id: string,
    @Body() filter: FindOneOptions,
    @Query("withCombination") withCombination: string
  ) {
    return this.productsService.findOne(+id, filter, !!withCombination);
  }

  @Put(":id")
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
