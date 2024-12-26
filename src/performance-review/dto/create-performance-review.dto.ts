import { IsNotEmpty, IsNumber, Max, Min, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Types } from 'mongoose';
import { Type } from 'class-transformer';

class RatingDto {
  @IsNumber()
  @Min(1)
  @Max(10)
  communication: number;

  @IsNumber()
  @Min(1)
  @Max(10)
  teamwork: number;

  @IsNumber()
  @Min(1)
  @Max(10)
  technicalSkills: number;

  @IsNumber()
  @Min(1)
  @Max(10)
  punctuality: number;

  @IsNumber()
  @Min(1)
  @Max(10)
  overall: number;
}

export class CreatePerformanceReviewDto {
  @IsNotEmpty()
  employeeID: Types.ObjectId;

  @IsNotEmpty()
  reviewerID: Types.ObjectId;

  @ValidateNested()
  @Type(() => RatingDto)
  @IsNotEmpty()
  rating: RatingDto;

  @IsOptional()
  @IsString()
  comment?: string;
}
