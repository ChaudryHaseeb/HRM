import { Schema, Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: [String], enum: ['ceo', 'cfo', 'cto', 'super admin', 'admin', 'technical manager', 'senior manager', 'project manager', 'hr', 'team lead'], required: true },
  },
  { timestamps: true },
);

UserSchema.pre('save', async function (next) {
  const user = this as any;
  if (!user.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  role: string[];
  createdAt: Date;
  updatedAt: Date;
}
