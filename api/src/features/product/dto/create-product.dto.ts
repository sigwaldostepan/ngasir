import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(3, { message: 'Nama produk minimal 3 karakter kidzz' })
  @IsNotEmpty({ message: 'Nama produk gak boleh kosong' })
  name: string;

  @IsNumber({}, { message: 'Harga harus angka dong' })
  @Min(1, { message: 'Harga produk minimal Rp. 1 deck' })
  @IsNotEmpty({ message: 'Harga produk gak boleh kosong' })
  price: number;

  @IsNumber({}, { message: 'Stok harus angka dong' })
  @Min(0, { message: 'Stok mana bisa negatif jir' })
  @IsOptional()
  stock: number;
}
