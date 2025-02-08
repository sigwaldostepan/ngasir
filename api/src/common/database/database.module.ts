import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/features/customer/customer.entity';
import { Product } from 'src/features/product/product.entity';
import { Stock } from 'src/features/stock/stock.entity';
import { TransactionDetail } from 'src/features/transaction/entities/transaction-detail.entity';
import { Transaction } from 'src/features/transaction/entities/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'sales',
      entities: [Product, Stock, Transaction, TransactionDetail, Customer],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
