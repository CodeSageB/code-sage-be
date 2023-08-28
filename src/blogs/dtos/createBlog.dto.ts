import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  MaxLength
} from 'class-validator';

export class CreateBlogDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  tags: string[];
}
