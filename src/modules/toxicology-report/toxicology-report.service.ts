import { Injectable } from '@nestjs/common';
import { StatusReport } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateToxicologyReportDto } from './dto/create-toxicology-report.dto';
import { UpdateToxicologyReportDto } from './dto/update-toxicology-report.dto';
import { ToxicologyReport } from './entities/toxicology-report.entity';

@Injectable()
export class ToxicologyReportService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createToxicologyReportDto: CreateToxicologyReportDto,
  ): Promise<ToxicologyReport> {
    const statusReport = this.checkStatusReport(createToxicologyReportDto);

    const toxicologyReport = await this.prisma.toxicologyReport.create({
      data: { ...createToxicologyReportDto, laudo_status: statusReport },
    });

    return toxicologyReport;
  }

  async findAll(): Promise<ToxicologyReport[]> {
    return this.prisma.toxicologyReport.findMany();
  }

  async findOneById(id: string): Promise<ToxicologyReport> {
    const toxicologyReport = await this.prisma.toxicologyReport.findUnique({
      where: { id },
    });
    return toxicologyReport;
  }

  async update(
    id: string,
    updateToxicologyReportDto: UpdateToxicologyReportDto,
  ): Promise<ToxicologyReport> {
    const statusReport = this.checkStatusReport(updateToxicologyReportDto);

    const toxicologyReport = await this.prisma.toxicologyReport.update({
      where: { id },
      data: { ...updateToxicologyReportDto, laudo_status: statusReport },
    });

    return toxicologyReport;
  }

  async remove(id: string): Promise<void> {
    await this.prisma.toxicologyReport.delete({ where: { id } });
  }

  private checkStatusReport(data: UpdateToxicologyReportDto): StatusReport {
    let positiveReport = false;

    switch (true) {
      case data.cocaina >= 0.5 &&
        (data.benzoilecgonina >= 0.05 ||
          data.cocaetileno >= 0.05 ||
          data.norcocaina >= 0.05):
        positiveReport = true;
        break;

      case data.anfetamina >= 0.2:
        positiveReport = true;
        break;

      case data.metanfetamina >= 0.2:
        positiveReport = true;
        break;

      case data.mda >= 0.2:
        positiveReport = true;
        break;

      case data.mdma >= 0.2:
        positiveReport = true;
        break;

      case data.thc >= 0.05:
        positiveReport = true;
        break;

      case data.morfina >= 0.2:
        positiveReport = true;
        break;

      case data.codeina >= 0.2:
        positiveReport = true;
        break;

      case data.heroina >= 0.2:
        positiveReport = true;
        break;

      default:
        positiveReport = false;
        break;
    }

    return positiveReport ? 'POSITIVO' : 'NEGATIVO';
  }
}
