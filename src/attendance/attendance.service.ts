import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attendance, AttendanceDocument } from './attendance.schema';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance.name) private attendanceModel: Model<AttendanceDocument>,
  ) {}

  async create(createAttendanceDto: CreateAttendanceDto): Promise<Attendance> {
    const { checkInTime, ...rest } = createAttendanceDto;
    const status = checkInTime ? 'present' : 'absent';

    const attendance = new this.attendanceModel({
      ...rest,
      status,
    });

    return attendance.save();
  }

  async findAll(): Promise<Attendance[]> {
    return this.attendanceModel.find().populate('employeeId').exec();
  }

  async findByEmployeeId(employeeId: string): Promise<Attendance[]> {
    const attendance = await this.attendanceModel
      .find({ employeeId })
      .populate('employeeId')
      .exec();
    if (attendance.length === 0) {
      throw new NotFoundException(`Attendance records for employee ID ${employeeId} not found`);
    }
    return attendance;
  }

  async findById(id: string): Promise<Attendance> {
    const attendance = await this.attendanceModel
      .findById(id)
      .populate('employeeId')
      .exec();
    if (!attendance) {
      throw new NotFoundException(`Attendance record with ID ${id} not found`);
    }
    return attendance;
  }

  async update(id: string, updateAttendanceDto: UpdateAttendanceDto): Promise<Attendance> {
    const updatedAttendance = await this.attendanceModel
      .findByIdAndUpdate(id, updateAttendanceDto, { new: true })
      .exec();
    if (!updatedAttendance) {
      throw new NotFoundException(`Attendance record with ID ${id} not found`);
    }
    return updatedAttendance;
  }

  async updateCheckIn(id: string, checkInTime: string): Promise<Attendance> {
    const attendance = await this.attendanceModel.findById(id).exec();
    if (!attendance) {
      throw new NotFoundException(`Attendance record with ID ${id} not found`);
    }
  
    // Convert the string to a Date object
    attendance.checkInTime = new Date(checkInTime);
    attendance.status = 'present';
    return attendance.save();
  }
  
  async updateCheckOut(id: string, checkOutTime: string): Promise<Attendance> {
    const attendance = await this.attendanceModel.findById(id).exec();
    if (!attendance) {
      throw new NotFoundException(`Attendance record with ID ${id} not found`);
    }
  
    // Convert the string to a Date object
    attendance.checkOutTime = new Date(checkOutTime);
    return attendance.save();
  }
  
  async delete(id: string): Promise<void> {
    const result = await this.attendanceModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Attendance record with ID ${id} not found`);
    }
  }
}
