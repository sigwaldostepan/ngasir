import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { TransactionType } from '../entities/transaction.entity';
import { Type } from 'class-transformer';
import { CustomerDto } from 'src/features/customer/dto/customer.dto';
import { TransactionDetailsDto } from './transaction-details.dto';

export class CreateTransactionDto {
  @IsEnum(TransactionType, { message: 'Tipe transaksi gk valdi nih' })
  @IsNotEmpty({ message: 'Tipe transaksi gak boleh dikosongin' })
  type: TransactionType;

  @IsArray()
  @ArrayMinSize(1, { message: 'Produk gak boleh dikosongin' })
  products: TransactionDetailsDto[];

  @IsObject()
  @ValidateNested()
  @Type(() => CustomerDto)
  customer: CustomerDto;
}
