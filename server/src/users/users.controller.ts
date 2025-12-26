import { Controller, Post, Body } from '@nestjs/common';
import { UserRequest } from 'src/types';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() request: UserRequest) {
    return this.usersService.createUser(request);
  }
}
