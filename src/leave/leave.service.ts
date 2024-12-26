import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Leave, LeaveDocument, LeaveStatus } from './leave.schema';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';

@Injectable()
export class LeaveService {
  constructor(@InjectModel(Leave.name) private leaveModel: Model<LeaveDocument>) {}

  // Create a new leave request
  async create(createLeaveDto: CreateLeaveDto): Promise<Leave> {
    const leave = new this.leaveModel(createLeaveDto);
    return leave.save();
  }

  // Get all leave requests
  async findAll(): Promise<Leave[]> {
    return this.leaveModel.find().populate('employeeId').populate('approvedBy').exec();
  }

  // Get leave request by ID
  async findById(id: string): Promise<Leave> {
    const leave = await this.leaveModel.findById(id).exec();
    if (!leave) {
      throw new NotFoundException(`Leave record with ID ${id} not found`);
    }
    return leave;
  }

  // Get leave requests by employee ID
  async findByEmployeeId(employeeId: string): Promise<Leave[]> {
    const leave = await this.leaveModel.find({ employeeId }).exec();
    if (leave.length === 0) {
      throw new NotFoundException(`No leave records found for employee ID ${employeeId}`);
    }
    return leave;
  }

  // Update leave request
  async update(id: string, updateLeaveDto: UpdateLeaveDto): Promise<Leave> {
    const updatedLeave = await this.leaveModel.findByIdAndUpdate(id, updateLeaveDto, { new: true }).exec();
    if (!updatedLeave) {
      throw new NotFoundException(`Leave record with ID ${id} not found`);
    }
    return updatedLeave;
  }

  // Approve leave request
  async approveLeave(id: string, managerId: string): Promise<Leave> {
    const leave = await this.leaveModel.findById(id).exec();
    if (!leave) {
      throw new NotFoundException(`Leave record with ID ${id} not found`);
    }
    leave.status = LeaveStatus.APPROVED;
    leave.approvedBy = new mongoose.Types.ObjectId(managerId);
    return leave.save();
  }

  // Reject leave request
  async rejectLeave(id: string): Promise<Leave> {
    const leave = await this.leaveModel.findById(id).exec();
    if (!leave) {
      throw new NotFoundException(`Leave record with ID ${id} not found`);
    }
    leave.status = LeaveStatus.REJECTED;
    return leave.save();
  }

  // Delete leave request
  async delete(id: string): Promise<void> {
    const result = await this.leaveModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Leave record with ID ${id} not found`);
    }
  }
}
