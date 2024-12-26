import { IsEnum, IsOptional, IsDateString, IsNotEmpty } from 'class-validator';
import { LeaveType, LeaveStatus } from '../leave.schema';

export class UpdateLeaveDto {
  @IsEnum(LeaveType)
  @IsOptional()
  leaveType: LeaveType;

  @IsDateString()
  @IsOptional()
  startDate: string;

  @IsDateString()
  @IsOptional()
  endDate: string;

  @IsEnum(LeaveStatus)
  @IsOptional()
  status: LeaveStatus;

  @IsNotEmpty()
  @IsOptional()
  approvedBy: string;
}
