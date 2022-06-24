import { NotFoundException } from '@nestjs/common';

export class ToxicologyReportNotFoundException extends NotFoundException {
  constructor() {
    super('Toxicology Report not found');
  }
}
