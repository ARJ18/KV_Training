import {
  IsNotEmpty,
  IsEmail,
  IsString,
  ValidateNested,
  IsEnum,
} from "class-validator";
import { AddressDto } from "./createAddress.dto";
import "reflect-metadata";
import { Type } from "class-transformer";
import { Role } from "../utils/role.enum";

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  address: AddressDto;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @IsNotEmpty()
  department: number;
}
