import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { MatchConstraint } from 'utils/match.decorator';
import { ProfileModule } from './profile/profile.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';

@Module({
  imports: [
    ProfileModule,
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://kuro1912:2wDX4mq2aKpY1BMZ@cluster0.ez6qf.mongodb.net/nestjs_demo?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    MatchConstraint,
    // implement JwtAuthGuard for all route
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ],
})
export class AppModule { }
