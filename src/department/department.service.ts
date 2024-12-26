import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Department, DepartmentDocument } from './department.schema';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department.name) private departmentModel: Model<DepartmentDocument>,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const department = new this.departmentModel(createDepartmentDto);
    return department.save();
  }

  async findAll(): Promise<Department[]> {
    return this.departmentModel.find().populate('managerId').exec();
  }

  async findById(id: string): Promise<Department> {
    const department = await this.departmentModel.findById(id).populate('managerId').exec();
    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
    return department;
  }

  async update(id: string, updateDepartmentDto: UpdateDepartmentDto): Promise<Department> {
    const updatedDepartment = await this.departmentModel
      .findByIdAndUpdate(id, updateDepartmentDto, { new: true })
      .exec();
    if (!updatedDepartment) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
    return updatedDepartment;
  }

  async delete(id: string): Promise<void> {
    const result = await this.departmentModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
  }
}
