import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AuthServiceInputException } from 'src/auth/exceptions/auth-service-input.exception';
import { UserServiceInputException } from 'src/modules/user/exceptions/user-service-input.exception';
import { ExceptionHandler } from './exception.handler';

export class UserInputExceptionHandler implements ExceptionHandler {
  handle(error: Error): void {
    if (error instanceof AuthServiceInputException) {
      throw new UnauthorizedException(error.message);
    }

    if (error instanceof UserServiceInputException) {
      throw new BadRequestException(error.message);
    }
  }
}
