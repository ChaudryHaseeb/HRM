import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Route to create a new user
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userService.findUserByEmail(createUserDto.email);
    if (existingUser) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }
    return this.userService.createUser(createUserDto);
  }

  // You can add more routes for other user actions like login, update, etc.
}
