import { IsOptional, MaxLength, MinLength } from "class-validator";

export class UpdateBlogDto {
    @MaxLength(100)
    @MinLength(1)
    @IsOptional()
    title: string;
    @IsOptional()
    @MinLength(1)
    content: string;
}