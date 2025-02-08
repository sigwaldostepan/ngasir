import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TransactionDetail } from '../entities/transaction-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransactionDetailRepository extends Repository<TransactionDetail> {
  constructor(
    @InjectRepository(TransactionDetail)
    private transactionDetailRepo: Repository<TransactionDetail>,
  ) {
    super(
      transactionDetailRepo.target,
      transactionDetailRepo.manager,
      transactionDetailRepo.queryRunner,
    );
  }
}
