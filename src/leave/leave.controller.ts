import { Controller, Post, Get, Param, Put, Delete, Body } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';

@Controller('leave')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  // Create a new leave request
  @Post()
  async create(@Body() createLeaveDto: CreateLeaveDto) {
    return this.leaveService.create(createLeaveDto);
  }

  // Get all leave requests
  @Get()
  async findAll() {
    return this.leaveService.findAll();
  }

  // Get leave request by ID
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.leaveService.findById(id);
  }

  // Get leave requests by employee ID
  @Get('employee/:employeeId')
  async findByEmployeeId(@Param('employeeId') employeeId: string) {
    return this.leaveService.findByEmployeeId(employeeId);
  }

  // Update leave request
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateLeaveDto: UpdateLeaveDto) {
    return this.leaveService.update(id, updateLeaveDto);
  }

  // Approve or reject leave request
  @Put(':id/approve')
  async approve(@Param('id') id: string, @Body('managerId') managerId: string) {
    return this.leaveService.approveLeave(id, managerId);
  }

  // Reject leave request
  @Put(':id/reject')
  async reject(@Param('id') id: string) {
    return this.leaveService.rejectLeave(id);
  }

  // Delete a leave request
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.leaveService.delete(id);
  }
}
