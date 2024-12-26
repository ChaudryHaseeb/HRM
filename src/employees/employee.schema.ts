import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema({ timestamps: true })
export class Employee {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true, unique: true })
  cnic: string;

  @Prop({
    type: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipcode: { type: String, required: true },
    },
    required: true,
  })
  address: Record<string, string>;

  @Prop({ required: true })
  dob: Date;

  @Prop({ required: true, enum: ['Male', 'Female', 'Other'] })
  gender: string;

  @Prop({ required: true })
  position: string;

  @Prop({ type: Types.ObjectId, ref: 'Department', required: true })
  departmentId: Types.ObjectId;

  @Prop({ required: true })
  salary: number;

  @Prop({ required: true })
  joiningDate: Date;

  @Prop({
    required: true,
    enum: ['active', 'inactive', 'resigned', 'terminated'],
    default: 'active',
  })
  status: string;

  @Prop({
    type: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      relationship: { type: String, required: true },
    },
    required: true,
  })
  emergencyContact: Record<string, string>;

  @Prop({
    type: {
      annual: { type: Number, default: 0 },
      sick: { type: Number, default: 0 },
      casual: { type: Number, default: 0 },
    },
    default: {},
  })
  leaveBalance: Record<string, number>;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
