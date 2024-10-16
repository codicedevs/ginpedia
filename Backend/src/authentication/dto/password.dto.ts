import { IsString, MinLength, minLength } from "class-validator";

export class changePasswordDto {
  @IsString()
  @MinLength(4)
  oldPassword: string;

  @IsString()
  @MinLength(4)
  newPassword: string;
}
