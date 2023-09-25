import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateBlogTranslationDto } from './updateBlogTranslation.dto';

export class UpdateBlogDto {
  @MaxLength(100)
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  content?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  tags?: string[];
}

export class NewUpdateBlogDto {
  @IsArray()
  @Type(() => UpdateBlogTranslationDto)
  @ValidateNested({ each: true })
  translations?: UpdateBlogTranslationDto[];

  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
