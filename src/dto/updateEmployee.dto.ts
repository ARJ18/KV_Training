import {
  IsEmail,
  IsString,
  ValidateNested,
  IsOptional,
  IsEnum,
  IsNumber,
} from "class-validator";
import { AddressDto } from "./createAddress.dto";
import "reflect-metadata";
import { Type } from "class-transformer";
import { Role } from "../utils/role.enum";

export class UpdateEmployeeDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  address?: AddressDto;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @IsOptional()
  @IsNumber()
  department?: number;
}
