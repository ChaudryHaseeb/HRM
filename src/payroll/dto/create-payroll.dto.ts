export class CreatePayrollDto {
    employeeId: string;
    month: string;
    year: number;
    basicSalary: number;
    allowances: number;
    netSalary: number;
    status?: string;
    paymentDate?: Date;
  }