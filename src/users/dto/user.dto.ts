import { Role } from "authorization/role.enum";
import { IsEmail, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @MinLength(3)
  name: string;
  @IsEmail()
  email: string;
  @MinLength(8)
  password: string;
  roles?: Role[];
}

export class UpdateUserDto {
  @MinLength(3)
  name?: string;
  @IsEmail()
  email?: string;
  @MinLength(8)
  password?: string;
  resetKey?: string;
  resetKeyTimeStamp?: string;
  roles?: Role[];
}

export class ResetPassDto {
  @MinLength(5)
  @MaxLength(6)
  resetKey: string;
  @IsEmail()
  email: string;
  @MinLength(8)
  password: string;
}

export class RecoverPasswordDto {
  @IsEmail()
  email: string
}