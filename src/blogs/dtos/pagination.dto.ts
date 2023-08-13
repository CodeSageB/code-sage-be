import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationDto {
  @IsInt()
  @IsOptional()
  @Min(1)
  page = 1;

  @IsInt()
  @IsOptional()
  @Min(1)
  take = 10;
}
