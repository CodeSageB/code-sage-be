import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateBlogDto {
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsNotEmpty()
  content: string;
}