import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UserRequest {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}

export class ProductRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Type(() => Number)
  price: number;
}

export interface TokenPayload {
  userId: number;
}
