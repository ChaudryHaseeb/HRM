import { IsString, IsEmail, IsArray, IsEnum, Matches, MinLength } from 'class-validator';

const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(passwordPattern, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
  })
  password: string;

  @IsArray()
  @IsEnum(
    ['ceo', 'cfo', 'cto', 'super admin', 'admin', 'technical manager', 'senior manager', 'project manager', 'hr', 'team lead'],
    { each: true },
  )
  role: string[];
}
