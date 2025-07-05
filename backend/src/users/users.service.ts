import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface CreateUserDto {
  username: string;
  email: string;
  passwordHash: string;
}

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async registerUser(data: CreateUserDto) {
    return this.prisma.user.create({
      data,
    });
  }
}
