import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { UpdatePayrollDto } from './dto/update-payroll.dto';

@Controller('payroll')
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}

  // Create a new payroll record
  @Post()
  create(@Body() createPayrollDto: CreatePayrollDto) {
    return this.payrollService.create(createPayrollDto);
  }

  // Get all payroll records
  @Get()
  findAll() {
    return this.payrollService.findAll();
  }

  // Get payroll records by employee ID
  @Get('employee/:employeeId')
  findByEmployeeId(@Param('employeeId') employeeId: string) {
    return this.payrollService.findByEmployeeId(employeeId);
  }

  // Get payroll record by ID
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.payrollService.findById(id);
  }

  // Update payroll record
  @Put(':id')
  update(@Param('id') id: string, @Body() updatePayrollDto: UpdatePayrollDto) {
    return this.payrollService.update(id, updatePayrollDto);
  }

  // Mark payroll as paid
  @Put(':id/mark-paid')
  markAsPaid(@Param('id') id: string) {
    return this.payrollService.markAsPaid(id);
  }

  // Delete payroll record
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.payrollService.delete(id);
  }
}
