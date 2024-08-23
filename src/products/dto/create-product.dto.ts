import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";
import { ProductType } from "products/entities/product.entity";

export class CreateProductDto {
  @MinLength(3)
  name: string;
  @IsString()
  description: string;
  @IsOptional()
  @IsEnum(ProductType)
  type?: ProductType;
}
