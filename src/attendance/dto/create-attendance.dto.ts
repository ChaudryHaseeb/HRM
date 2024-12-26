export class CreateAttendanceDto {
    employeeId: string;
    date: string;
    checkInTime?: Date;
    checkOutTime?: Date;
    status?: string;
    remarks?: string;
  }
