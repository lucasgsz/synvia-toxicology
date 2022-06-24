import { Module } from '@nestjs/common';
import { ToxicologyReportController } from './toxicology-report.controller';
import { ToxicologyReportService } from './toxicology-report.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ToxicologyReportController],
  imports: [PrismaModule],
  providers: [ToxicologyReportService],
})
export class ToxicologyModule {}
