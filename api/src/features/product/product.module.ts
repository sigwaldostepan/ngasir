import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { StockModule } from 'src/features/stock/stock.module';
import { ProductRepository } from './product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), StockModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
