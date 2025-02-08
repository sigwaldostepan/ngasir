import { Type } from 'class-transformer';
import {
  IsEmpty,
  IsNumber,
  IsNotEmpty,
  IsObject,
  Min,
  ValidateNested,
} from 'class-validator';
import { Product } from 'src/features/product/product.entity';

export class CreateStockDto {
  @IsNumber({}, { message: 'Stok harus angka dong' })
  @Min(0, { message: 'Stok barang mana bisa negatif jir' })
  @IsNotEmpty({ message: 'Stok barang ga boleh dikosongin' })
  quantity: number;

  @IsObject()
  @ValidateNested()
  @Type(() => Product)
  product: Product;
}
