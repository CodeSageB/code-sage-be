import { IsEnum, IsNotEmpty } from 'class-validator';
import { LanguagesEnum } from '../enums/languages.enum';

export class LanguageDto {
  @IsNotEmpty()
  @IsEnum(LanguagesEnum)
  lang: LanguagesEnum;
}
