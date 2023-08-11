import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateBlogDto {
  @MaxLength(100)
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  content: string;
}
