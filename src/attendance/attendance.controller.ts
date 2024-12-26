import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  // Create a new attendance record
  @Post()
  createAttendance(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceService.create(createAttendanceDto);
  }

  // Get all attendance records
  @Get()
  getAllAttendance() {
    return this.attendanceService.findAll();
  }

  // Get attendance records by employee ID
  @Get('employee/:employeeId')
  getAttendanceByEmployeeId(@Param('employeeId') employeeId: string) {
    return this.attendanceService.findByEmployeeId(employeeId);
  }

  // Get attendance record by ID
  @Get(':id')
  getAttendanceById(@Param('id') id: string) {
    return this.attendanceService.findById(id);
  }

  // Update check-in time for attendance
  @Put(':id/checkin')
  updateCheckIn(@Param('id') id: string, @Body('checkInTime') checkInTime: string) {
    return this.attendanceService.updateCheckIn(id, checkInTime);
  }

  // Update check-out time for attendance
  @Put(':id/checkout')
  updateCheckOut(@Param('id') id: string, @Body('checkOutTime') checkOutTime: string) {
    return this.attendanceService.updateCheckOut(id, checkOutTime);
  }

  // Update attendance record
  @Put(':id')
  updateAttendance(@Param('id') id: string, @Body() updateAttendanceDto: UpdateAttendanceDto) {
    return this.attendanceService.update(id, updateAttendanceDto);
  }

  // Delete an attendance record
  @Delete(':id')
  deleteAttendance(@Param('id') id: string) {
    return this.attendanceService.delete(id);
  }
}
