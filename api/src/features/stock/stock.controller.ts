import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { StockService } from './stock.service';
import { UpdateStockDto } from './dto/update-stock.dto';

@Controller('stocks')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get()
  async getStocks() {
    const stocks = await this.stockService.getStocks();

    return {
      data: stocks,
    };
  }

  @Put(':id')
  async updateStock(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateStockDto: UpdateStockDto,
  ) {
    const updatedStock = await this.stockService.updateStock(
      id,
      updateStockDto,
    );

    return {
      data: updatedStock,
    };
  }
}
