import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AttendanceDocument = Attendance & Document;

@Schema({ timestamps: true })
export class Attendance {
  @Prop({ type: Types.ObjectId, ref: 'Employee', required: true })
  employeeId: Types.ObjectId;

  @Prop({ required: true, type: Date, default: () => new Date().toISOString().split('T')[0] })
  date: string;

  @Prop({ type: Date, default: Date.now })
  checkInTime: Date;

  @Prop({ type: Date, default: Date.now })
  checkOutTime: Date;

  @Prop({
    type: String,
    enum: ['present', 'absent', 'leave'],
    default: 'absent',
  })
  status: string;

  @Prop({ type: String, default: '' })
  remarks: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
