import { PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Product } from 'src/features/product/product.entity';

export class TransactionDetailsDto extends PickType(Product, ['id']) {
  @IsNumber()
  @IsNotEmpty({ message: 'Jumlah barang dlm transaksi gk boleh dikosongin' })
  quantity: number;
}
