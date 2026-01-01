import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { UserRequest } from '../types/index.js';
import * as bcrypt from 'bcrypt';
import { Prisma, User } from 'generated/prisma/client.js';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUsers(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }

  async createUser(data: UserRequest): Promise<{
    email: string;
    id: number;
  }> {
    const hashedPassword: string = await bcrypt.hash(data.password, 10);

    const dataObj = {
      ...data,
      password: hashedPassword,
    };

    try {
      return await this.prismaService.user.create({
        data: dataObj,
        select: {
          email: true,
          id: true,
        },
      });
    } catch (err) {
      console.log(err);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (err.code === 'P2002') {
        throw new UnprocessableEntityException('Email already exists');
      }

      throw err;
    }
  }

  async getUser(filter: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findUniqueOrThrow({
      where: filter,
    });
  }
}
