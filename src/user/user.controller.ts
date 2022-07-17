import { UserService } from './user.service';
import { Controller, Post, Body } from '@nestjs/common';
import { UserBody } from 'types/user.type';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  CreateUser(@Body() body: UserBody) {
    this.userService.createUser(body)
  }
}
