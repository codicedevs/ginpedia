import { IsNumber, Max, Min } from "class-validator";

export class CreateRatingDto {
  productId: number;
  userId: number;
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;
}
