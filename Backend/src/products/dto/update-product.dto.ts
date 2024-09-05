import { PartialType } from "@nestjs/mapped-types";
import { CreateProductDto } from "./create-product.dto";
import { IsEnum, IsString, MinLength } from "class-validator";
import { ProductType } from "products/entities/product.entity";

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @MinLength(3)
  name: string;
  @IsString()
  description: string;
  @IsEnum(ProductType)
  type: ProductType;
}
