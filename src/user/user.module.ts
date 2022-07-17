import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserSchema } from './user.schema';
import { jwtConstant } from './user.constant';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: jwtConstant.secret,
      signOptions: { expiresIn: 360000 }
    })
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
