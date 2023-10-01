import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { LanguagesEnum } from '../../shared/enums/languages.enum';

export class CreateBlogTranslationDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsEnum(LanguagesEnum)
  language: LanguagesEnum;
}
