import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

export interface JwtPayload {
  /**
   * @description equal to userId
   */
  sub: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRETKEY,
    });
  }

  async validate(payload: JwtPayload): Promise<any> {
    const user = await this.authService.validateUser(
      payload,
    );

    if (!user) {
      throw new HttpException(
        'Invalid token',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
