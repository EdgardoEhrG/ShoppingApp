import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import * as bcrypt from 'bcrypt';
import ms from 'ms';
import { User } from 'generated/prisma/client.js';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../types/index.js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: User, response: Response) {
    const expires = new Date();
    const jwtExp = ms(this.configService.getOrThrow<number>('JWT_EXPIRATION'));

    expires.setMilliseconds(expires.getMilliseconds() + Number(jwtExp));

    const tokenPayload: TokenPayload = {
      userId: user.id,
    };

    const token = this.jwtService.sign(tokenPayload);

    response.cookie('AuthToken', token, {
      secure: true,
      httpOnly: true,
      expires,
    });

    return { tokenPayload };
  }

  async verifyUser(email: string, password: string) {
    try {
      const user = await this.usersService.getUser({ email });
      const isAuthenticated = await bcrypt.compare(password, user.password);

      if (!isAuthenticated) {
        throw new UnauthorizedException('Credentials are not valid');
      }

      return user;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException('Credentials are not valid');
    }
  }

  verifyToken(jwt: string) {
    this.jwtService.verify(jwt);
  }
}
