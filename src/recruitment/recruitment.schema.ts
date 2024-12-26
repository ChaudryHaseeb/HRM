import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Recruitment extends Document {
  @Prop({ required: true })
  jobTitle: string;

  @Prop({ type: Types.ObjectId, ref: 'Department', required: true })
  departmentID: Types.ObjectId;

  @Prop({ required: true })
  jobDescription: string;

  @Prop({ type: [String], required: true })
  requiredSkills: string[];

  @Prop({ default: Date.now })
  postedDate: Date;

  @Prop({ required: true })
  closingDate: Date;

  @Prop({
    type: [
      {
        applicantName: { type: String, required: true },
        email: { type: String, required: true },
        resumeLink: { type: String, required: true },
        status: {
          type: String,
          enum: ['applied', 'shortlisted', 'interviewed', 'rejected', 'hired'],
          default: 'applied',
        },
      },
    ],
  })
  applications: {
    applicantName: string;
    email: string;
    resumeLink: string;
    status: 'applied' | 'shortlisted' | 'interviewed' | 'rejected' | 'hired';
  }[];
}

export const RecruitmentSchema = SchemaFactory.createForClass(Recruitment);
