import { Controller, Post, Body, UseGuards, Delete, Param } from '@nestjs/common';
import { Public } from 'utils/public.decorator';

import { AuthService } from './auth.service';

import { ChangePassword, LoginBody, SignupBody } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  /*NOTE
    @route   POST api/auth/login
    @desc    Authenticate user & get token
    @access  Public
  */
  @Public()
  @Post('login')
  async login(@Body() body: LoginBody) {
    return await this.authService.login(body)
  }

  /*NOTE
    @route   POST api/auth/signup
    @desc    Register user
    @access  Public
  */
  @Public()
  @Post('signup')
  async CreateUser(@Body() body: SignupBody) {
    return await this.authService.createUser(body)
  }

  /*NOTE
    @route   DELETE api/auth/:id
    @desc    delete user
    @access  Private
  */
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.authService.deleteUser(id)
  }

  /*NOTE
    @route   POST api/auth/change-pw
    @desc    change user password
    @access  Private
  */
  @Post('change-pw')
  async changePassword(@Body() body: ChangePassword) {
    return await this.authService.changePassword(body)
  }
}
