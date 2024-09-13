import { PartialType } from "@nestjs/mapped-types";
import { CreateProductDto } from "./create-product.dto";
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";
import { Product, ProductType } from "products/entities/product.entity";

export class UpdateProductDto {
  @IsOptional()
  @MinLength(3)
  name: string;
  @IsOptional()
  @IsString()
  description: string;
  @IsOptional()
  @IsEnum(ProductType)
  type: ProductType;
  @IsOptional()
  @IsString()
  image?: string;
  @IsOptional()
  @IsString()
  origin?: string;
  @IsOptional()
  @IsString()
  graduation?: string;
  @IsOptional()
  @IsArray()
  combinations?: number[];
}
