import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransactionRepository extends Repository<Transaction> {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>,
  ) {
    super(
      transactionRepo.target,
      transactionRepo.manager,
      transactionRepo.queryRunner,
    );
  }
}
