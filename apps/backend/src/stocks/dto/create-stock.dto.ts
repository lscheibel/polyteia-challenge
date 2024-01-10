import { IsString, IsInt, IsOptional, ValidateNested, IsNumber, Min } from 'class-validator';

export class CreateStockDataDto {
  @IsNumber()
  @Min(0)
  value: number;

  @IsInt()
  @Min(0)
  timestamp: number;
}

export class CreateStockDto {
  @IsString()
  symbol: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @ValidateNested()
  data: CreateStockDataDto[];
}
