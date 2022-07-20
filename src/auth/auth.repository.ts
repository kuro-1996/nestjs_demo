import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SignupBody } from "./dto";
import { UserDocument } from "./schema/user.schema";

export class AuthRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) {}

  async findOne(email: string) {
    return await this.userModel.findOne({ email })
  }

  createNewUser(body: SignupBody) {
    return new this.userModel({
      ...body,
      created_at: Date.now()
    })
  }

  async saveUser(user: UserDocument) {
    return await user.save()
  }

  async deleteUser(id: string) {
    await this.userModel.findByIdAndDelete(id)
  }

  async updateUser(id, body) {
    await this.userModel.findByIdAndUpdate(id, body)
  }
}