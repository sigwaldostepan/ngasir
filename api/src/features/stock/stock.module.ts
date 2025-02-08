import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from './stock.entity';
import { StockRepository } from './stock.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Stock])],
  controllers: [StockController],
  providers: [StockService, StockRepository],
  exports: [StockService],
})
export class StockModule {}
