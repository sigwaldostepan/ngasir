import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { EditCustomerDto } from './dto/edit-customer.dto';
import { CustomerRepository } from './customer.repository';

@Injectable()
export class CustomerService {
  constructor(private customerRepo: CustomerRepository) {}

  public async getCustomers() {
    const customers = await this.customerRepo.find();

    return customers;
  }

  public async getCustomerById(id: number) {
    const customer = await this.customerRepo.findOne({
      where: { id },
    });

    if (!customer) {
      throw new NotFoundException('Customer ga ketemu');
    }

    return customer;
  }

  public async createCustomer(createCustomerDto: CreateCustomerDto) {
    const customer = this.customerRepo.create(createCustomerDto);

    return await this.customerRepo.save(customer);
  }

  public async editCustomer(id: number, editCustomerDto: EditCustomerDto) {
    const customer = await this.getCustomerById(id);
    const edittedCutomer = this.customerRepo.merge(customer, editCustomerDto);

    return await this.customerRepo.save(edittedCutomer);
  }

  public async deleteCustomer(id: number) {
    return await this.customerRepo.delete(id);
  }
}
