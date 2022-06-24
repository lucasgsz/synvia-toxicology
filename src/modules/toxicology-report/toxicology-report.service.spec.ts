import { Provider } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { ToxicologyReport } from './entities/toxicology-report.entity';
import { ToxicologyReportService } from './toxicology-report.service';

let toxicologyReportsArray: ToxicologyReport[] = [];

const PrismaServiceMock = {
  provide: PrismaService,
  useValue: {
    toxicologyReport: {
      create: jest.fn().mockImplementation(({ data }) => {
        toxicologyReportsArray.push({ ...data });
        return toxicologyReportsArray[toxicologyReportsArray.length - 1];
      }),
      findUnique: jest.fn().mockImplementation(({ where }) => {
        return toxicologyReportsArray.find((toxicologyReports) => {
          return toxicologyReports.id === where.id;
        });
      }),
      findMany: jest.fn().mockImplementation(() => {
        return toxicologyReportsArray;
      }),
      update: jest.fn().mockImplementation(({ where, data }) => {
        const toxicologyReportsIndex = toxicologyReportsArray.findIndex(
          (toxicologyReports) => {
            return toxicologyReports.id === where.id;
          },
        );

        toxicologyReportsArray[toxicologyReportsIndex] = {
          ...toxicologyReportsArray[toxicologyReportsIndex],
          ...data,
        };

        return toxicologyReportsArray[toxicologyReportsIndex];
      }),
      delete: jest.fn().mockImplementation(({ where }) => {
        const toxicologyReportsIndex = toxicologyReportsArray.findIndex(
          (toxicologyReports) => {
            return toxicologyReports.id === where.id;
          },
        );

        toxicologyReportsArray.splice(toxicologyReportsIndex, 1);
      }),
    },
  },
} as Provider;

describe('ToxicologyReportService', () => {
  let toxicologyReportsService: ToxicologyReportService;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ToxicologyReportService, PrismaServiceMock],
    }).compile();

    toxicologyReportsService = module.get<ToxicologyReportService>(
      ToxicologyReportService,
    );
    prismaService = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    toxicologyReportsArray = [];

    await toxicologyReportsService.create({
      codigo_amostra: '12345678',
      cocaina: 0,
      anfetamina: 0,
      metanfetamina: 0,
      mda: 0,
      mdma: 0,
      thc: 0,
      morfina: 0,
      codeina: 0,
      heroina: 0,
      benzoilecgonina: 0,
      cocaetileno: 0,
      norcocaina: 0,
    });
    toxicologyReportsArray[0].id = '1cd535db-fd49-4671-ab26-0f2b565e863a';

    await toxicologyReportsService.create({
      codigo_amostra: '91234567',
      cocaina: 0,
      anfetamina: 0,
      metanfetamina: 0,
      mda: 0,
      mdma: 0,
      thc: 0,
      morfina: 0.2,
      codeina: 0,
      heroina: 0,
      benzoilecgonina: 0,
      cocaetileno: 0,
      norcocaina: 0,
    });
    toxicologyReportsArray[1].id = 'ec3b4cfc-5028-47c2-b631-970088efae5e';

    await toxicologyReportsService.create({
      codigo_amostra: '87654321',
      cocaina: 0.6,
      anfetamina: 0,
      metanfetamina: 0,
      mda: 0,
      mdma: 0,
      thc: 0,
      morfina: 0,
      codeina: 0,
      heroina: 0,
      benzoilecgonina: 1,
      cocaetileno: 0,
      norcocaina: 0,
    });
    toxicologyReportsArray[2].id = '48e09976-5556-4b1f-b830-d480aec4299c';

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(toxicologyReportsService).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  describe('create', () => {
    it('should create toxicologyReports', async () => {
      const toxicologyReports = await toxicologyReportsService.create({
        codigo_amostra: '12345678',
        cocaina: 0,
        anfetamina: 0,
        metanfetamina: 0,
        mda: 0,
        mdma: 0,
        thc: 0,
        morfina: 0,
        codeina: 0,
        heroina: 0,
        benzoilecgonina: 0,
        cocaetileno: 0,
        norcocaina: 0,
      });

      expect(toxicologyReports.codigo_amostra).toEqual('12345678');
      expect(toxicologyReportsArray.length).toEqual(4);
      expect(toxicologyReportsArray[3].laudo_status).toEqual('NEGATIVO');

      expect(prismaService.toxicologyReport.create).toHaveBeenCalledWith({
        data: {
          codigo_amostra: '12345678',
          cocaina: 0,
          anfetamina: 0,
          metanfetamina: 0,
          mda: 0,
          mdma: 0,
          thc: 0,
          morfina: 0,
          codeina: 0,
          heroina: 0,
          benzoilecgonina: 0,
          cocaetileno: 0,
          norcocaina: 0,
          laudo_status: 'NEGATIVO',
        },
      });
    });
  });

  describe('findAll', () => {
    it('should find all reports', async () => {
      const reports = await toxicologyReportsService.findAll();

      expect(reports).toEqual(toxicologyReportsArray);
      expect(prismaService.toxicologyReport.findMany).toHaveBeenCalled();
    });
  });

  describe('findOneById', () => {
    it('should find one toxicologyReports by id', async () => {
      const toxicologyReports = await toxicologyReportsService.findOneById(
        'ec3b4cfc-5028-47c2-b631-970088efae5e',
      );

      expect(toxicologyReports).toEqual(toxicologyReportsArray[1]);

      expect(prismaService.toxicologyReport.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'ec3b4cfc-5028-47c2-b631-970088efae5e' },
        }),
      );
    });
  });

  describe('update', () => {
    it('should update toxicologyReports', async () => {
      const toxicologyReports = await toxicologyReportsService.update(
        'ec3b4cfc-5028-47c2-b631-970088efae5e',
        {
          codigo_amostra: '12345678',
          cocaina: 10,
          anfetamina: 10,
          metanfetamina: 10,
          mda: 10,
          mdma: 10,
          thc: 10,
          morfina: 13,
          codeina: 10,
          heroina: 10,
          benzoilecgonina: 11,
          cocaetileno: 10,
          norcocaina: 10,
        },
      );

      expect(toxicologyReports.id).toEqual(
        'ec3b4cfc-5028-47c2-b631-970088efae5e',
      );
      expect(toxicologyReports.laudo_status).toEqual('POSITIVO');
      expect(toxicologyReports.cocaina).toEqual(10);
      expect(toxicologyReports.benzoilecgonina).toEqual(11);
      expect(toxicologyReports.morfina).toEqual(13);

      expect(prismaService.toxicologyReport.update).toHaveBeenCalledWith({
        where: { id: 'ec3b4cfc-5028-47c2-b631-970088efae5e' },
        data: {
          codigo_amostra: '12345678',
          cocaina: 10,
          anfetamina: 10,
          metanfetamina: 10,
          mda: 10,
          mdma: 10,
          thc: 10,
          morfina: 13,
          codeina: 10,
          heroina: 10,
          benzoilecgonina: 11,
          cocaetileno: 10,
          norcocaina: 10,
          laudo_status: 'POSITIVO',
        },
      });
    });
  });

  describe('remove', () => {
    it('should delete toxicologyReports', async () => {
      await toxicologyReportsService.remove(
        'ec3b4cfc-5028-47c2-b631-970088efae5e',
      );

      expect(toxicologyReportsArray.length).toEqual(2);

      expect(prismaService.toxicologyReport.delete).toHaveBeenCalledWith({
        where: { id: 'ec3b4cfc-5028-47c2-b631-970088efae5e' },
      });

      const toxicologyReports = await toxicologyReportsService.findOneById(
        'ec3b4cfc-5028-47c2-b631-970088efae5e',
      );

      expect(toxicologyReports).toBeUndefined();
    });
  });
});
