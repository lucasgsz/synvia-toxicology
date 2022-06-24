import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { JwtExceptionHandler } from './handlers/jwt-exception.handler';
import { PrismaExceptionHandler } from './handlers/prisma-exception.handler';
import { UserInputExceptionHandler } from './handlers/user-input-exception.handler';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<unknown>,
  ): Observable<unknown> | Promise<Observable<unknown>> {
    return next.handle().pipe(
      catchError((error) => {
        new UserInputExceptionHandler().handle(error);

        new PrismaExceptionHandler().handle(error);

        new JwtExceptionHandler().handle(error);

        throw error;
      }),
    );
  }
}
