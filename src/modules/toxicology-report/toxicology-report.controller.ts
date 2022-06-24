import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/public.decorator';
import { IsAdmin } from 'src/common/decorators/is-admin.decorator';
import { CreateToxicologyReportDto } from './dto/create-toxicology-report.dto';
import { UpdateToxicologyReportDto } from './dto/update-toxicology-report.dto';
import { ToxicologyReport } from './entities/toxicology-report.entity';
import { ToxicologyReportService } from './toxicology-report.service';

@ApiTags('toxicology')
@Controller('toxicology-report')
export class ToxicologyReportController {
  constructor(
    private readonly toxicologyReportService: ToxicologyReportService,
  ) {}

  @ApiOperation({ summary: 'Verify and save a new report' })
  @IsAdmin()
  @Post()
  async create(
    @Body() createToxicologyReportDto: CreateToxicologyReportDto,
  ): Promise<ToxicologyReport> {
    return this.toxicologyReportService.create(createToxicologyReportDto);
  }

  @ApiOperation({ summary: 'Returns all reports' })
  @Public()
  @Get()
  async findAll(): Promise<ToxicologyReport[]> {
    return this.toxicologyReportService.findAll();
  }

  @ApiOperation({ summary: 'Get report by ID' })
  @Public()
  @Get('/:id')
  async findOneById(@Param('id') id: string): Promise<ToxicologyReport> {
    return this.toxicologyReportService.findOneById(id);
  }

  @ApiOperation({ summary: 'Update report by ID' })
  @IsAdmin()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateToxicologyReportDto: UpdateToxicologyReportDto,
  ): Promise<ToxicologyReport> {
    return this.toxicologyReportService.update(id, updateToxicologyReportDto);
  }

  @ApiOperation({ summary: 'Delete report by ID' })
  @IsAdmin()
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.toxicologyReportService.remove(id);
  }
}
