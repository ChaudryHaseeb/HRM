import { IsEnum, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';
import { LeaveType, LeaveStatus } from '../leave.schema';

export class CreateLeaveDto {
  @IsNotEmpty()
  employeeId: string;

  @IsEnum(LeaveType)
  leaveType: LeaveType;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsEnum(LeaveStatus)
  @IsOptional()
  status: LeaveStatus = LeaveStatus.PENDING;

  @IsOptional()
  @IsNotEmpty()
  approvedBy?: string;
}
