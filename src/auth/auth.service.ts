import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from "@nestjs/mongoose";

import { Model } from "mongoose";

import { UserDocument } from "./schema/user.schema";

import * as bcrypt from 'bcrypt'

import { ChangePassword, LoginBody, SignupBody } from './dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>, private jwtService: JwtService) { }

  throwError() {
    throw new BadRequestException('Invalid Credentials')
  }

  async login(body: LoginBody) {
    const { email, password } = body;

    const user = await this.userModel.findOne({ email });

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

  async createUser(body: SignupBody) {
    const { email, password } = body

    const user = await this.userModel.findOne({ email });

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

  async deleteUser(id: string) {
    await this.userModel.findByIdAndDelete(id)
  }

  async changePassword(body: ChangePassword) {
    const { email, password } = body

    const user = await this.userModel.findOne({ email })

    // See if user exits
    if (!user) {
      throw new BadRequestException('User does not exits')
    }

    const salt = await bcrypt.genSalt(10);

    const newPassword = await bcrypt.hash(password, salt);

    await this.userModel.findByIdAndUpdate(user._id, {
      password: newPassword
    })
  }
}
