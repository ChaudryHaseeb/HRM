import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Body,
    Param,
  } from '@nestjs/common';
  import { DepartmentService } from './department.service';
  import { CreateDepartmentDto } from './dto/create-department.dto';
  import { UpdateDepartmentDto } from './dto/update-department.dto';
  
  @Controller('departments')
  export class DepartmentController {
    constructor(private readonly departmentService: DepartmentService) {}
  
    @Post()
    createDepartment(@Body() createDepartmentDto: CreateDepartmentDto) {
      return this.departmentService.create(createDepartmentDto);
    }
  
    @Get()
    getAllDepartments() {
      return this.departmentService.findAll();
    }
  
    @Get(':id')
    getDepartmentById(@Param('id') id: string) {
      return this.departmentService.findById(id);
    }
  
    @Put(':id')
    updateDepartment(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto) {
      return this.departmentService.update(id, updateDepartmentDto);
    }
  
    @Delete(':id')
    deleteDepartment(@Param('id') id: string) {
      return this.departmentService.delete(id);
    }
  }
  