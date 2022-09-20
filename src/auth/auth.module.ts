import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { UsersModule } from './../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: true,
      // session: false,
    }),
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: { expiresIn: process.env.EXPIRESIN },
    }),
  ],
  providers: [
    AuthService,
    UsersService,
    JwtStrategy,
    PrismaService,
  ],
  controllers: [AuthController],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
