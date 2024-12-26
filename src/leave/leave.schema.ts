import { Schema, Document } from 'mongoose';
import * as mongoose from 'mongoose';

export enum LeaveType {
  ANNUAL = 'annual',
  SICK = 'sick',
  CASUAL = 'casual',
  UNPAID = 'unpaid',
}

export enum LeaveStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

// Define the Leave interface
export interface Leave {
  employeeId: mongoose.Types.ObjectId;
  leaveType: LeaveType;
  startDate: Date;
  endDate: Date;
  status: LeaveStatus;
  approvedBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type LeaveDocument = Leave & Document;

// Define the schema for Leave model
export const LeaveSchema = new Schema<LeaveDocument>({
  employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  leaveType: { type: String, enum: Object.values(LeaveType), required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: Object.values(LeaveStatus), default: LeaveStatus.PENDING },
  approvedBy: { type: Schema.Types.ObjectId, ref: 'Employee', required: false },
}, { timestamps: true });

// Create and export the Leave model
export const Leave = mongoose.model<LeaveDocument>('Leave', LeaveSchema);
