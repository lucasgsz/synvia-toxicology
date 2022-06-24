import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { accessJwtConfig } from 'src/config/jwt.config';
import { AccessTokenContent } from './types/access-token-content';
import { AccessTokenPayload } from './types/access-token-payload';

@Injectable()
export class AccessJwtStrategy extends PassportStrategy(
  Strategy,
  'access-jwt',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: accessJwtConfig.secret,
    });
  }

  async validate(payload: AccessTokenPayload): Promise<AccessTokenContent> {
    return {
      userId: payload.sub,
      userRole: payload.userRole,
    };
  }
}
