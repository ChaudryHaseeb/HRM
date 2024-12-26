import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PayrollDocument = Payroll & Document;

@Schema({ timestamps: true })
export class Payroll {
  @Prop({ type: Types.ObjectId, ref: 'Employee', required: true })
  employeeId: Types.ObjectId;

  @Prop({ required: true, type: String })
  month: string;

  @Prop({ required: true, type: Number })
  year: number;

  @Prop({ required: true, type: Number })
  basicSalary: number;

  @Prop({ required: true, type: Number })
  allowances: number;

  @Prop({ required: true, type: Number })
  netSalary: number;

  @Prop({
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending',
  })
  status: string;

  @Prop({ type: Date, default: Date.now })
  paymentDate: Date;
}

export const PayrollSchema = SchemaFactory.createForClass(Payroll);
