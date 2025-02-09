import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'
import { ProductModule } from 'src/features/product/product.module';
import { StockModule } from 'src/features/stock/stock.module';
import { TransactionModule } from '../transaction/transaction.module';
import { CustomerModule } from '../customer/customer.module';
import { DatabaseModule } from 'src/common/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development.local', '.env']
    }),
    DatabaseModule,
    ProductModule,
    StockModule,
    TransactionModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
