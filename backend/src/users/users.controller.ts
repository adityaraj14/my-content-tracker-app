import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

class RegisterUserDto {
  username: string;
  email: string;
  password: string;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async register(@Body() body: RegisterUserDto) {
    // TODO: Hash the password before saving to the database (use bcrypt or similar)
    // In a real app, hash the password before saving
    const user = await this.usersService.registerUser({
      username: body.username,
      email: body.email,
      passwordHash: body.password, // TODO: hash password in production
    });
    // Don't return passwordHash in response
    const { passwordHash, ...result } = user;
    return result;
  }
}
