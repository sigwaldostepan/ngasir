import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Customer } from 'src/features/customer/customer.entity';
import { Product } from 'src/features/product/product.entity';
import { Stock } from 'src/features/stock/stock.entity';
import { TransactionDetail } from 'src/features/transaction/entities/transaction-detail.entity';
import { Transaction } from 'src/features/transaction/entities/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => (
        {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          entities: [Product, Stock, Transaction, TransactionDetail, Customer],
          synchronize: (configService.get<string>('NODE_ENV') === 'development') ? true : false
        }
      )
    }),
  ],
})
export class DatabaseModule {}
