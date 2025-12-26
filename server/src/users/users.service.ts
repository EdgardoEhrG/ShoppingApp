import { Injectable } from '@nestjs/common';
import { UserRequest } from 'src/types';

@Injectable()
export class UsersService {
  createUser(data: UserRequest) {
    console.log(data);
  }
}
