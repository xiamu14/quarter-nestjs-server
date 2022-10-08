import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import * as dayjs from 'dayjs';
import { CreateUserDto, LoginUserDto } from '../users/dto';
import {
  AuthService,
  RegistrationStatus,
} from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

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
    console.log('verify req', req.user);
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

  @Get('refresh')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  public refresh(@Request() req) {
    console.log('verify req', req.user);
    const token = this.authService.createToken({
      sub: req.user.id,
    });
    return {
      success: true,
      data: { token },
    };
  }
}
