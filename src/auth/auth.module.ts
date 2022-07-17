import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserSchema } from 'src/user/user.schema';
import { jwtConstant } from 'src/user/user.constant';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: jwtConstant.secret,
      signOptions: { expiresIn: 360000 }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
