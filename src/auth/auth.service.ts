import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt'

import { AuthRepository } from './auth.repository';
import { ChangePassword, LoginBody, SignupBody } from './dto';

@Injectable()
export class AuthService {
  constructor(public authRepo: AuthRepository, private jwtService: JwtService) { }

  throwError() {
    throw new BadRequestException('Invalid Credentials')
  }

  async login(body: LoginBody) {
    const { email, password } = body;

    const user = await this.authRepo.findOne(email);

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

    const user = await this.authRepo.findOne(email);

    // See if user exits
    if (user) {
      throw new BadRequestException('User already exits')
    }

    const newUser = await this.authRepo.createNewUser(body)

    const salt = await bcrypt.genSalt(10);

    newUser.password = await bcrypt.hash(password, salt);

    const result = await this.authRepo.saveUser(newUser)

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
    await this.authRepo.deleteUser(id)
  }

  async changePassword(body: ChangePassword) {
    const { email, password } = body

    const user = await this.authRepo.findOne(email)

    // See if user exits
    if (!user) {
      throw new BadRequestException('User does not exits')
    }

    const salt = await bcrypt.genSalt(10);

    const newPassword = await bcrypt.hash(password, salt);

    await this.authRepo.updateUser(user._id, {
      password: newPassword
    })
  }
}
