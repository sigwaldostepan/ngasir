import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { StockModule } from '../stock/stock.module';
import { CustomerModule } from '../customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { TransactionDetail } from './entities/transaction-detail.entity';
import { TransactionDetailRepository } from './repositories/transaction-detail.repository';
import { TransactionRepository } from './repositories/transaction.repository';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, TransactionDetail]),
    StockModule,
    CustomerModule,
    ProductModule,
  ],
  controllers: [TransactionController],
  providers: [
    TransactionService,
    TransactionDetailRepository,
    TransactionRepository,
  ],
})
export class TransactionModule {}
