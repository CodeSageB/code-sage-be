import { IsEnum, IsString, MaxLength } from 'class-validator';
import { LanguagesEnum } from '../../shared/enums/languages.enum';

export class UpdateBlogTranslationDto {
  @IsString()
  @MaxLength(100)
  title?: string;

  @IsString()
  content?: string;

  @IsEnum(LanguagesEnum)
  language: LanguagesEnum;
}
