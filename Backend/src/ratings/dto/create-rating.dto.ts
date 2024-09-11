import { IsNumber, Max, Min } from "class-validator";

export class CreateRatingDto {
  productId: number;
  userId: number;
  @IsNumber()
  @Min(1)
  @Max(10)
  rating: number;
}
