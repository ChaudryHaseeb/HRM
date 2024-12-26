import { IsArray, IsDate, IsNotEmpty, IsString, IsOptional, IsEmail, ValidateNested } from 'class-validator';
import { Types } from 'mongoose';
import { Type } from 'class-transformer';

class ApplicationDto {
  @IsNotEmpty()
  @IsString()
  applicantName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  resumeLink: string;

  @IsOptional()
  @IsString()
  status: 'applied' | 'shortlisted' | 'interviewed' | 'rejected' | 'hired';
}

export class CreateRecruitmentDto {
  @IsNotEmpty()
  @IsString()
  jobTitle: string;

  @IsNotEmpty()
  departmentID: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  jobDescription: string;

  @IsArray()
  @IsString({ each: true })
  requiredSkills: string[];

  @IsNotEmpty()
  @IsDate()
  closingDate: Date;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ApplicationDto)
  applications?: ApplicationDto[];
}
