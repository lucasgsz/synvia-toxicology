import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ToxicologyReport } from '../entities/toxicology-report.entity';

export class CreateToxicologyReportDto implements ToxicologyReport {
  /**
   * codigo_amostra value
   * @example "12345678"
   */
  @IsString()
  @IsNotEmpty()
  codigo_amostra: string;

  /**
   * cocaina value
   * @example "0"
   */
  @IsNumber()
  @IsNotEmpty()
  cocaina: number;

  /**
   * anfetamina value
   * @example "0"
   */
  @IsNumber()
  @IsNotEmpty()
  anfetamina: number;

  /**
   * metanfetamina value
   * @example "0"
   */
  @IsNumber()
  @IsNotEmpty()
  metanfetamina: number;

  /**
   * mda value
   * @example "0"
   */
  @IsNumber()
  @IsNotEmpty()
  mda: number;

  /**
   * mdma value
   * @example "0"
   */
  @IsNumber()
  @IsNotEmpty()
  mdma: number;

  /**
   * thc value
   * @example "0"
   */
  @IsNumber()
  @IsNotEmpty()
  thc: number;

  /**
   * morfina value
   * @example "0"
   */
  @IsNumber()
  @IsNotEmpty()
  morfina: number;

  /**
   * codeina value
   * @example "0"
   */
  @IsNumber()
  @IsNotEmpty()
  codeina: number;

  /**
   * heroina value
   * @example "0"
   */
  @IsNumber()
  @IsNotEmpty()
  heroina: number;

  /**
   * benzoilecgonina value
   * @example "0"
   */
  @IsNumber()
  @IsNotEmpty()
  benzoilecgonina: number;

  /**
   * cocaetileno value
   * @example "0"
   */
  @IsNumber()
  @IsNotEmpty()
  cocaetileno: number;

  /**
   * norcocaina value
   * @example "0"
   */
  @IsNumber()
  @IsNotEmpty()
  norcocaina: number;
}
