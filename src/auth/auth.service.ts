import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';

import * as bcrypt from 'bcrypt'

import { Model } from 'mongoose';
import { UserBody } from 'src/user/user.dto';
import { UserResponse } from 'types/user.type';
import { AuthBody } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserBody>,
    private jwtService: JwtService
  ) { }

  throwError() {
    throw new BadRequestException('Invalid Credentials')
  }

  async login(body: AuthBody) {
    const { email, password } = body;

    const user: UserResponse = await this.userModel.findOne({ email });

    // check if email exists
    if (!user) this.throwError()

    const isMatch = await bcrypt.compare(password, user.password);

    // check if correct password
    if (!isMatch) this.throwError()

    // jwt payload
    const payload = {
      user: {
        email,
        id: user._id
      }
    }

    return {
      token: this.jwtService.sign(payload)
    }
  }
}
