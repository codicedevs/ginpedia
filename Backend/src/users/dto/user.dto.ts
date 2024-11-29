import { Role } from "authorization/role.enum";
import { Type } from "class-transformer";
import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";

export class CreateUserDto {
  @MinLength(3)
  name?: string;
  @IsEmail()
  @IsOptional()
  email?: string;
  @MinLength(4)
  @IsOptional()
  password?: string;
  @IsOptional()
  roles?: Role[];
}

export class UpdateUserDto {
  @MinLength(3)
  name?: string;
  @IsEmail()
  email?: string;
  @IsOptional()
  @MinLength(4)
  password?: string;
  resetKey?: string;
  resetKeyTimeStamp?: string;
  roles?: Role[];
  formattedBookmarks?: string[];
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
  email: string;
}

export class SSOUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  familyName: string;

  @IsString()
  @IsOptional()
  givenName: string;

  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  photo: string | null;
}

export class SSODataDto {
  @IsString()
  @IsOptional()
  idToken: string | null;

  @IsArray()
  @IsOptional()
  scopes: string[];

  @IsString()
  @IsOptional()
  serverAuthCode: string | null;

  @ValidateNested()
  @Type(() => SSOUserDto)
  user: SSOUserDto;
}

export class CreateUserSSODto {
  @ValidateNested()
  @Type(() => SSODataDto)
  data: SSODataDto;

  @IsString()
  type: string;
}
