import {
  IsArray,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";
import { Product, ProductType } from "products/entities/product.entity";

export class CreateProductDto {
  @MinLength(3)
  name: string;
  @IsString()
  description: string;
  @IsOptional()
  @IsString()
  type?: ProductType;
  @IsArray()
  @IsOptional()
  combinations?: Product[];
}
