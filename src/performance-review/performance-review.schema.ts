import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class PerformanceReview extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Employee', required: true })
  employeeID: Types.ObjectId;

  @Prop({ type: Date, default: Date.now })
  reviewDate: Date;

  @Prop({ type: Types.ObjectId, ref: 'Employee', required: true })
  reviewerID: Types.ObjectId;

  @Prop({
    type: Object,
    required: true,
    properties: {
      communication: { type: Number, min: 1, max: 10, required: true },
      teamwork: { type: Number, min: 1, max: 10, required: true },
      technicalSkills: { type: Number, min: 1, max: 10, required: true },
      punctuality: { type: Number, min: 1, max: 10, required: true },
      overall: { type: Number, min: 1, max: 10, required: true },
    },
  })
  rating: {
    communication: number;
    teamwork: number;
    technicalSkills: number;
    punctuality: number;
    overall: number;
  };

  @Prop({ type: String })
  comment: string;
}

export const PerformanceReviewSchema =
  SchemaFactory.createForClass(PerformanceReview);
