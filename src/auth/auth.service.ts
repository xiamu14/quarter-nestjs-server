import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { CreateUserDto, LoginUserDto } from '../users/dto';
import { UsersService } from './../users/users.service';
import { JwtPayload } from './jwt.strategy';

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

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}
  async register(userDto: CreateUserDto) {
    let status: RegistrationStatus = {
      success: true,
      message: 'ACCOUNT_CREATE_SUCCESS',
    };

    try {
      const user = await this.usersService.create(userDto);
      const token = this._createToken({ sub: user.id });
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
    const token = this._createToken({ sub: user.id });

    return {
      user,
      token,
    };
  }

  private _createToken({ sub }: JwtPayload): any {
    const Authorization = this.jwtService.sign({
      sub,
    });
    return {
      expiresIn: process.env.EXPIRESIN,
      Authorization,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    const user = await this.usersService.findByPayload(
      payload,
    );
    if (!user) {
      throw new HttpException(
        'INVALID_TOKEN',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
