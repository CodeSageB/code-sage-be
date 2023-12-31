import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateBlogTranslationDto } from './createBlogTranslation.dto';

export class CreateBlogDto {
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => CreateBlogTranslationDto)
  @ValidateNested({ each: true })
  translations: CreateBlogTranslationDto[];

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  tags: string[];
}
