import { Controller, Post, Body } from '@nestjs/common';

import { UserService } from './user.service';

import { UserBody } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  /*NOTE
    @route   POST api/users
    @desc    Register user
    @access  Public
  */
  @Post()
  async CreateUser(@Body() body: UserBody) {
    return await this.userService.createUser(body)
  }
}
