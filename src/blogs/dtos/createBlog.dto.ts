import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateBlogDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
