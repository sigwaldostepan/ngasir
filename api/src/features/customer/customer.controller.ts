import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { EditCustomerDto } from './dto/edit-customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async getCustomers() {
    const customers = await this.customerService.getCustomers();

    return {
      data: customers,
    };
  }

  @Get(':id')
  async getCustomerById(@Param('id', ParseIntPipe) id: number) {
    const customer = await this.customerService.getCustomerById(id);

    return {
      data: customer,
    };
  }

  @Post()
  @HttpCode(201)
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    console.log(createCustomerDto);
    const customer =
      await this.customerService.createCustomer(createCustomerDto);

    return {
      data: customer,
    };
  }

  @Put(':id')
  async editCustomer(
    @Param('id', ParseIntPipe) id: number,
    @Body() editCustomerDto: EditCustomerDto,
  ) {
    const edittedCustomer = await this.customerService.editCustomer(
      id,
      editCustomerDto,
    );

    return {
      data: edittedCustomer,
    };
  }

  @Delete(':id')
  async deleteCustomer(@Param('id', ParseIntPipe) id: number) {
    await this.customerService.deleteCustomer(id);

    return {
      message: 'Customer berhasil dihapus',
    };
  }
}
