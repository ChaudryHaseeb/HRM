import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LeaveController } from './leave.controller';
import { LeaveService } from './leave.service';
import { Leave, LeaveSchema } from './leave.schema';
import { EmployeeModule } from '../employees/employee.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Leave.name, schema: LeaveSchema }]), EmployeeModule],
  controllers: [LeaveController],
  providers: [LeaveService],
  exports: [LeaveService],
})
export class LeaveModule {}
