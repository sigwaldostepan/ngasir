import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class CustomerRepository extends Repository<Customer> {
  constructor(
    @InjectRepository(Customer)
    private customerRepo: Repository<Customer>,
  ) {
    super(customerRepo.target, customerRepo.manager, customerRepo.queryRunner);
  }
}
