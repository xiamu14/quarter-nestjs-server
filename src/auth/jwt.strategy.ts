import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as dayjs from 'dayjs';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

export interface JwtPayload {
  /**
   * @description equal to userId
   */
  sub: string;
  exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
) {
  constructor(private readonly _: AuthService) {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRETKEY,
    });
  }

  async validate(payload: JwtPayload): Promise<any> {
    console.log('payload', payload);
    const expDate = dayjs(
      new Date(0).setUTCSeconds(payload.exp),
    );
    console.log('format', expDate.format('YYYY-MM-DD'));
    return { id: payload.sub, exp: payload.exp };
  }
}
