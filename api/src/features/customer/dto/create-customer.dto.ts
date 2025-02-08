import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @MinLength(3, { message: 'Nama minimal 3 karakter' })
  @MaxLength(40, { message: "Nama maksimal 40 karakter, bro's yapping" })
  name: string;
}
