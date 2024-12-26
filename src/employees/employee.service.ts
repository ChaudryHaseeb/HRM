import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee, EmployeeDocument } from './employee.schema';
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import {  UpdateEmployeeDto } from "./dto/update-employee.dto";

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = new this.employeeModel(createEmployeeDto);
    return employee.save();
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeModel.find().populate('departmentId').exec();
  }

  async findById(id: string): Promise<Employee> {
    const employee = await this.employeeModel.findById(id).populate('departmentId').exec();
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    const updatedEmployee = await this.employeeModel
      .findByIdAndUpdate(id, updateEmployeeDto, { new: true })
      .exec();
    if (!updatedEmployee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return updatedEmployee;
  }

  async delete(id: string): Promise<void> {
    const result = await this.employeeModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
  }
}
