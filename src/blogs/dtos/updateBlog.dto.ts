import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateBlogTranslationDto } from './updateBlogTranslation.dto';

export class UpdateBlogDto {
  @IsArray()
  @IsOptional()
  @Type(() => UpdateBlogTranslationDto)
  @ValidateNested({ each: true })
  translations?: UpdateBlogTranslationDto[];

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  tags?: string[];
}
