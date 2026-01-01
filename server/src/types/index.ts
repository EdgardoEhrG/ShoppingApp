import { IsEmail, IsStrongPassword } from 'class-validator';

export class UserRequest {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}

export interface TokenPayload {
  userId: number;
}
