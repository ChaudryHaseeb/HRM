import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseService } from './database.service';
import { EmployeeController } from './employees/employees.controller';
import { EmployeeModule } from './employees/employee.module';
import { DepartmentController } from './department/department.controller';
import { DepartmentModule } from './department/department.module';
import { AttendanceController } from './attendance/attendance.controller';
import { AttendanceModule } from './attendance/attendance.module';
import { PayrollController } from './payroll/payroll.controller';
import { PayrollModule } from './payroll/payroll.module';
import { LeaveController } from './leave/leave.controller';
import { LeaveModule } from './leave/leave.module';
import { PerformanceReviewController } from './performance-review/performance-review.controller';
import { PerformanceReviewModule } from './performance-review/performance-review.module';
import { RecruitmentController } from './recruitment/recruitment.controller';
import { RecruitmentModule } from './recruitment/recruitment.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: 'mongodb+srv://admin:root@contacts.hl6jf.mongodb.net/Nest-Project?retryWrites=true&w=majority&appName=Contacts',
        dbName: 'Nest-Project',
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    EmployeeModule,
    DepartmentModule,
    AttendanceModule,
    PayrollModule,
    LeaveModule,
    PerformanceReviewModule,
    RecruitmentModule,
    AuthModule,
  ],
  controllers: [AppController, EmployeeController, DepartmentController, AttendanceController, PayrollController, LeaveController, PerformanceReviewController, RecruitmentController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
