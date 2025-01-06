import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDepartmentDto {
  @IsNotEmpty() // Field is required
  @IsString()  
    name: string;

    @IsNotEmpty() // Field is required
    @IsString()   // Must be a string
    managerId: string;

    @IsOptional() // Field is optional
    @IsString()   // If present, must be a string
    description?: string;
  }
