import { Prisma, StatusReport } from '@prisma/client';
import { IsEnum } from 'class-validator';
export class ToxicologyReport
  implements Prisma.ToxicologyReportUncheckedCreateInput
{
  /**
   * Report ID as UUID
   * @example "e6cf9a58-438c-4fce-8d85-db3d22db270a"
   */
  id?: string;

  /**
   * codigo_amostra value
   * @example "12345678"
   */

  codigo_amostra: string;

  /**
   * cocaina value
   * @example "0.1"
   */

  cocaina: number;

  /**
   * anfetamina value
   * @example "0.1"
   */

  anfetamina: number;

  /**
   * metanfetamina value
   * @example "0.1"
   */

  metanfetamina: number;

  /**
   * mda value
   * @example "0.1"
   */

  mda: number;

  /**
   * mdma value
   * @example "0.1"
   */

  mdma: number;

  /**
   * thc value
   * @example "0.1"
   */

  thc: number;

  /**
   * morfina value
   * @example "0.1"
   */

  morfina: number;

  /**
   * codeina value
   * @example "0.1"
   */

  codeina: number;

  /**
   * heroina value
   * @example "0.1"
   */

  heroina: number;

  /**
   * benzoilecgonina value
   * @example "0.1"
   */

  benzoilecgonina: number;

  /**
   * cocaetileno value
   * @example "0.1"
   */

  cocaetileno: number;

  /**
   * norcocaina value
   * @example "0.1"
   */

  norcocaina: number;

  /**
   * Status of Report
   * @example "NEGATIVO"
   */
  @IsEnum(StatusReport)
  laudo_status?: StatusReport;
}
