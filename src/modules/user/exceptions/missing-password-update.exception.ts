import { UserServiceInputException } from './user-service-input.exception';

export class MissingPasswordUpdateException extends UserServiceInputException {
  constructor() {
    super('Please enter both new password and current password');
  }
}
