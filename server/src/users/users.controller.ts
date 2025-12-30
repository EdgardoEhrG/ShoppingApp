import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserRequest } from '../types/index.js';
import { UsersService } from './users.service.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Post()
  createUser(@Body() request: UserRequest) {
    return this.usersService.createUser(request);
  }
}
