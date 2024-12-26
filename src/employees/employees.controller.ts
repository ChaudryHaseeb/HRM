import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Body,
    Param,
  } from '@nestjs/common';
  import { EmployeeService } from './employee.service';
  import { CreateEmployeeDto } from './dto/create-employee.dto';
  import {  UpdateEmployeeDto } from './dto/update-employee.dto';
  
  @Controller('employees')
  export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}
  
    @Post()
    createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
      return this.employeeService.create(createEmployeeDto);
    }
  
    @Get()
    getAllEmployees() {
      return this.employeeService.findAll();
    }
  
    @Get(':id')
    getEmployeeById(@Param('id') id: string) {
      return this.employeeService.findById(id);
    }
  
    @Put(':id')
    updateEmployee(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
      return this.employeeService.update(id, updateEmployeeDto);
    }
  
    @Delete(':id')
    deleteEmployee(@Param('id') id: string) {
      return this.employeeService.delete(id);
    }
  }
  