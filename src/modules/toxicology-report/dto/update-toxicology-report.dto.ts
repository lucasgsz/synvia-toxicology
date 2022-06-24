import { PartialType } from '@nestjs/swagger';
import { CreateToxicologyReportDto } from './create-toxicology-report.dto';

export class UpdateToxicologyReportDto extends PartialType(
  CreateToxicologyReportDto,
) {}
