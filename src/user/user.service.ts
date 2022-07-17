import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserBody } from 'types/user.type';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<UserBody>) { }

  async createUser(body: UserBody) {
    const newUser = new this.userModel(body)
    const result = await newUser.save()
    console.log(result);
    return result._id
  }
}
