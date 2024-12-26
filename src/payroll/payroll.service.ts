import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payroll, PayrollDocument } from './payroll.schema';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { UpdatePayrollDto } from './dto/update-payroll.dto';

@Injectable()
export class PayrollService {
  constructor(
    @InjectModel(Payroll.name) private payrollModel: Model<PayrollDocument>,
  ) {}

  // Create a new payroll record
  async create(createPayrollDto: CreatePayrollDto): Promise<Payroll> {
    const payroll = new this.payrollModel(createPayrollDto);
    return payroll.save();
  }

  // Get all payroll records
  async findAll(): Promise<Payroll[]> {
    return this.payrollModel.find().populate('employeeId').exec();
  }

  // Get payroll by employee ID
  async findByEmployeeId(employeeId: string): Promise<Payroll[]> {
    const payroll = await this.payrollModel
      .find({ employeeId })
      .populate('employeeId')
      .exec();
    if (payroll.length === 0) {
      throw new NotFoundException(`Payroll records for employee ID ${employeeId} not found`);
    }
    return payroll;
  }

  // Get payroll by ID
  async findById(id: string): Promise<Payroll> {
    const payroll = await this.payrollModel.findById(id).exec();
    if (!payroll) {
      throw new NotFoundException(`Payroll record with ID ${id} not found`);
    }
    return payroll;
  }

  // Update payroll record
  async update(id: string, updatePayrollDto: UpdatePayrollDto): Promise<Payroll> {
    const updatedPayroll = await this.payrollModel
      .findByIdAndUpdate(id, updatePayrollDto, { new: true })
      .exec();
    if (!updatedPayroll) {
      throw new NotFoundException(`Payroll record with ID ${id} not found`);
    }
    return updatedPayroll;
  }

  // Mark payroll as paid and set payment date
  async markAsPaid(id: string): Promise<Payroll> {
    const payroll = await this.payrollModel.findById(id).exec();
    if (!payroll) {
      throw new NotFoundException(`Payroll record with ID ${id} not found`);
    }

    payroll.status = 'paid';
    payroll.paymentDate = new Date();
    return payroll.save();
  }

  // Delete payroll record
  async delete(id: string): Promise<void> {
    const result = await this.payrollModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Payroll record with ID ${id} not found`);
    }
  }
}
