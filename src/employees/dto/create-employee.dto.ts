import { IsNotEmpty, IsString, IsEmail, IsEnum, IsObject, IsDate, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  cnic: string;

  @IsNotEmpty()
  @IsObject()
  address: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  };

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  dob: Date;

  @IsNotEmpty()
  @IsEnum(['Male', 'Female', 'Other'])
  gender: string;

  @IsNotEmpty()
  @IsString()
  position: string;

  @IsNotEmpty()
  departmentId: string;

  @IsNotEmpty()
  @IsNumber()
  salary: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  joiningDate: Date;

  @IsOptional()
  @IsEnum(['active', 'inactive', 'resigned', 'terminated'])
  status: string;

  @IsNotEmpty()
  @IsObject()
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };

  @IsOptional()
  @IsObject()
  leaveBalance: {
    annual?: number;
    sick?: number;
    casual?: number;
  };
}
