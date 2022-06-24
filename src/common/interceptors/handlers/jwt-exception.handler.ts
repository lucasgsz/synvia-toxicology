import { UnauthorizedException } from '@nestjs/common';
import { ExceptionHandler } from './exception.handler';

export class JwtExceptionHandler implements ExceptionHandler {
  private jwtErrorNames = [
    'TokenExpiredError',
    'JsonWebTokenError',
    'NotBeforeError',
  ];

  handle(error: Error): void {
    if (this.isJwtException(error)) {
      throw new UnauthorizedException('Invalid authorization token');
    }
  }

  private isJwtException(error: Error): boolean {
    return this.jwtErrorNames.includes(error.name);
  }
}
