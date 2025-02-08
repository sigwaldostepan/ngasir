import { PickType } from '@nestjs/mapped-types';
import { CreateStockDto } from './create-stock.dto';

export class UpdateStockDto extends PickType(CreateStockDto, ['quantity']) {}
