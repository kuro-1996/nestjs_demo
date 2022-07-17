import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';

import { AuthBody } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  /*NOTE
    @route   POST api/auth
    @desc    Authenticate user & get token
    @access  Public
  */
  @Post()
  async Login(@Body() body: AuthBody) {
    return await this.authService.login(body)
  }

  /*NOTE
    @route   POST api/auth/change_pw
    @desc    change user password
    @access  Private
  */
  @Post('change_pw')
  async ChangePassword() {
    
  }
}
