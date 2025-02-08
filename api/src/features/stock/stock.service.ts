import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { StockRepository } from './stock.repository';

@Injectable()
export class StockService {
  constructor(private stockRepo: StockRepository) {}

  public async getStocks() {
    const stock = await this.stockRepo.find();

    return stock;
  }

  public async getStockById(id: string) {
    const stock = await this.stockRepo.findOne({
      where: { id },
    });

    if (!stock) {
      throw new NotFoundException('Stok produk gak ketemu');
    }

    return stock;
  }

  public async createStock(createStockDto: CreateStockDto) {
    const stock = this.stockRepo.create({
      quantity: createStockDto.quantity || 0,
      product: createStockDto.product,
    });

    const savedStock = await this.stockRepo.save(stock);

    // for better response lmao
    return {
      id: savedStock.id,
      product: savedStock.product,
      quantity: savedStock.quantity,
    };
  }

  public async updateStock(id: string, updateStockDto: UpdateStockDto) {
    const stock = await this.getStockById(id);

    return await this.stockRepo.save({
      id: stock.id,
      quantity: updateStockDto.quantity,
      product: stock.product,
    });
  }
}
