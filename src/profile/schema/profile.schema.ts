import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'
import { User } from 'src/auth/schema/user.schema';

export type ProfileDocument = Profile & mongoose.Document;

@Schema()
export class Profile {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  birthday: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);