import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { CreateUserDto, LoginUserDto } from '../users/dto';
import { UsersService } from './../users/users.service';

type UserClient = Omit<User, 'password'>;

export interface RegistrationStatus {
  success: boolean;
  message: string;
  data?: {
    user: UserClient;
    token: { expiresIn: string; Authorization: string };
  };
}
export interface RegistrationSeederStatus {
  success: boolean;
  message: string;
  data?: UserClient[];
}

interface Params {
  sub: string;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}
  async register(userDto: CreateUserDto) {
    let status: RegistrationStatus = {
      success: true,
      message: 'account create success',
    };

    try {
      const user = await this.usersService.create(userDto);
      const token = this.createToken({ sub: user.id });
      status.data = { user, token };
    } catch (error) {
      status = {
        success: false,
        message: error,
      };
    }
    return status;
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    // find user in db
    const user = await this.usersService.findByEmail(
      loginUserDto,
    );

    // generate and sign token
    const token = this.createToken({ sub: user.id });

    return {
      success: true,
      message: 'login_success',
      data: {
        user,
        token,
      },
    };
  }

  public createToken({ sub }: Params) {
    const Authorization = this.jwtService.sign({
      sub,
    });
    return {
      expiresIn: process.env.EXPIRESIN,
      Authorization,
    };
  }

  async validateUser(data: Params) {
    const user = await this.usersService.findByPayload(
      data,
    );
    if (!user) {
      throw new HttpException(
        'invalid_token',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }

  async validateAndRefresh(data: Params) {
    try {
      const user = await this.validateUser(data);
      const token = await this.createToken(data);
      return { ...user, token };
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
