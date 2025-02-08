import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CustomerDto {
  @IsNumber({}, { message: 'Id customer invalid' })
  @IsOptional()
  id?: number;

  @IsString()
  @IsOptional()
  @MinLength(3, { message: 'Masukkin nama customer yg bener...' })
  customerName?: string;
}
