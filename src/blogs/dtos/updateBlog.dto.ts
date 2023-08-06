import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateBlogDto {
  @MaxLength(100)
  @MinLength(1)
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @MinLength(1)
  @IsString({ message: 'Ty seš ale debil' })
  content: string;
}
