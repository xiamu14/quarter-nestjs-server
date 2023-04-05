import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import * as dayjs from 'dayjs';
import { CreateUserDto, LoginUserDto } from '../users/dto';
import {
  AuthService,
  RegistrationStatus,
} from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

type MeResponse =
  | Omit<User, 'password'>
  | {
      token: {
        expiresIn: string;
        Authorization: string;
      };
    };

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus =
      await this.authService.register(createUserDto);
    if (!result.success) {
      throw new HttpException(
        result.message,
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }

  @Post('login')
  public async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<any> {
    return await this.authService.login(loginUserDto);
  }

  @Get('verify')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  public verify(@Request() req) {
    // console.log('verify req', req.user);
    const expDate = dayjs(
      new Date(0).setUTCSeconds(req.user.exp),
    ); // 僅將最外層的`new Date`改成`dayjs`即可無痛轉換成`dayjs`格式
    const current = dayjs();
    if (current.isAfter(expDate.subtract(1, 'day'))) {
      return {
        success: false,
        message: 'expires soon',
      };
    }
    return {
      message: 'accessToken still valid',
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('me')
  @ApiOkResponse({
    description:
      '判断 token 是否有效，有效则自动刷新，并返回 user 信息',
  })
  public async me(@Request() req): Promise<MeResponse> {
    console.log('me', req.user);
    const result =
      await this.authService.validateAndRefresh({
        sub: req.user.id,
      });
    return result;
  }
}
