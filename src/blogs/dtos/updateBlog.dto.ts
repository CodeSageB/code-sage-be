import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateBlogDto {
  @MaxLength(100)
  @MinLength(1)
  @IsOptional()
  @IsString()
  title: string;

  @MinLength(1)
  @IsOptional()
  @IsString()
  content: string;
}
