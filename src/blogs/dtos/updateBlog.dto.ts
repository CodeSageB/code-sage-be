import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateBlogTranslationDto } from './updateBlogTranslation.dto';

export class UpdateBlogDto {
  @IsArray()
  @Type(() => UpdateBlogTranslationDto)
  @ValidateNested({ each: true })
  translations?: UpdateBlogTranslationDto[];

  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
