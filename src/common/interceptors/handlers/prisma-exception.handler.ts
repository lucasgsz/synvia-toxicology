import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaError } from 'prisma-error-enum';
import { ToxicologyReportNotFoundException } from 'src/common/exceptions/toxicology-report/toxicology-report-not-found.exception';
import { EmailInUseException } from 'src/common/exceptions/user/email-in-use.exception';
import { UserNotFoundException } from 'src/common/exceptions/user/user-not-found.exception';
import { ExceptionHandler } from './exception.handler';

export class PrismaExceptionHandler implements ExceptionHandler {
  handle(error: Error): void {
    if (error instanceof PrismaClientKnownRequestError) {
      switch (error.code) {
        case PrismaError.UniqueConstraintViolation:
          if (this.isEmailConstraintViolation(error.meta)) {
            throw new EmailInUseException();
          }

          break;

        case PrismaError.RecordsNotFound:
          if (this.isUserError(error)) {
            throw new UserNotFoundException();
          }

          if (this.isToxicologyReportError(error)) {
            throw new ToxicologyReportNotFoundException();
          }

          break;

        default:
          throw error;
      }
    }

    if (this.isPrismaUnknownError(error)) {
      if (error.message === 'No Toxicology Report found') {
        throw new ToxicologyReportNotFoundException();
      }
    }
  }

  private isPrismaUnknownError(error): boolean {
    return !!error.clientVersion;
  }

  private isEmailConstraintViolation(errorMeta: object): boolean {
    return Object.values(errorMeta)[0][0] === 'email';
  }

  private isUserError(error: PrismaClientKnownRequestError): boolean {
    return error.message.includes('prisma.user');
  }

  private isToxicologyReportError(
    error: PrismaClientKnownRequestError,
  ): boolean {
    return error.message.includes('prisma.ToxicologyReport');
  }
}
