import {
  Controller,
  Post,
  Body,
  Get,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import type { TokenPayload, UserRequest } from '../types/index.js';
import { UsersService } from './users.service.js';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { JWTAuthGuard } from '../auth/guard/index.js';
import { CurrentUser } from '../auth/current-user.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Post()
  @UseInterceptors(NoFilesInterceptor())
  createUser(@Body() request: UserRequest) {
    return this.usersService.createUser(request);
  }

  @Get('me')
  @UseGuards(JWTAuthGuard)
  getMe(@CurrentUser() user: TokenPayload) {
    return user;
  }
}
