import { BadRequestException } from '@nestjs/common';

export class EmailInUseException extends BadRequestException {
  constructor() {
    super('E-mail already in use');
  }
}
