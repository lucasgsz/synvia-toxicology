import { UserServiceInputException } from './user-service-input.exception';

export class InvalidPasswordUpdateException extends UserServiceInputException {
  constructor() {
    super('Invalid current password');
  }
}
