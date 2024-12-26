import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get() // GET /users
  findAll() {
    return 'This will return all users';
  }

  @Post() // POST /users
  async create(@Body() createUserDto: any) {
    const user = await this.usersService.create(createUserDto);
    return `Created user with ID: ${user._id}`;
  }

  @Get(':id') // GET /users/:id
  findOne(@Param('id') id: string) {
    return `This will return user with ID: ${id}`;
  }

  @Get('test-connection')
  async testConnection() {
    return this.usersService.testConnection();
  }
}
