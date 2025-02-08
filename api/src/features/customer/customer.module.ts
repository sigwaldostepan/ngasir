import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { CustomerRepository } from './customer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerRepository],
  exports: [CustomerService],
})
export class CustomerModule {}
