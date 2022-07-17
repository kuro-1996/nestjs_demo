import { Injectable, BadRequestException } from '@nestjs/common';

import * as bcrypt from 'bcrypt'

import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';

import { UserBody } from './user.dto';
import { UserResponse } from 'types/user.type';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserBody>,
    private jwtService: JwtService
  ) { }

  async createUser(body: UserBody) {
    const { email, password } = body

    const user: UserResponse = await this.userModel.findOne({ email });

    // See if user exits
    if (user) {
      throw new BadRequestException('User already exits')
    }

    const newUser = new this.userModel({
      ...body,
      created_at: Date.now()
    })

    const salt = await bcrypt.genSalt(10);

    newUser.password = await bcrypt.hash(password, salt);

    const result = await newUser.save()

    const payload = {
      user: {
        email,
        id: result._id
      }
    }

    return {
      token: this.jwtService.sign(payload)
    }
  }
}
