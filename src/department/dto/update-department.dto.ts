import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class UpdateDepartmentDto {
    @IsNotEmpty()
    @IsString()
    name?: string;

    @IsNotEmpty()
    @IsString()
    managerId: string;

    @IsOptional()
    @IsString()
    description?: string;
  }
