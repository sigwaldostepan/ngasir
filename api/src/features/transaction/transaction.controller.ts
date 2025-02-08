import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  async getTransactions(@Query() page: number, @Query() limit: number) {
    // const transactions = await this.transactionService()
    return {
      page,
      limit,
    };
  }

  @Post()
  async createTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    let res = {};

    const transactionType = createTransactionDto.type;
    switch (transactionType) {
      case 'sale':
        res =
          await this.transactionService.createSaleTransaction(
            createTransactionDto,
          );
        break;
      case 'restock':
        res =
          await this.transactionService.createRestockTransaction(
            createTransactionDto,
          );
        break;
    }

    return res;
  }
}
