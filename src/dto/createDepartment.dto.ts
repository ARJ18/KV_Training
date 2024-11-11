import { IsNotEmpty, IsString } from "class-validator";

export class DepartmentDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export default DepartmentDto;
