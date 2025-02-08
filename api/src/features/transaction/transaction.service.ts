import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Product } from '../product/product.entity';
import { TransactionDetail } from './entities/transaction-detail.entity';
import { StockService } from '../stock/stock.service';
import { CustomerService } from '../customer/customer.service';

@Injectable()
export class TransactionService {
  private transactionRepo: Repository<Transaction>;
  private transactionDetailRepo: Repository<TransactionDetail>;
  private productRepo: Repository<Product>;
  constructor(
    private stockService: StockService,
    private customerService: CustomerService,
  ) {}

  public async getTransactions(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const transactions = await this.transactionRepo.findAndCount({
      skip,
      take: limit,
    });

    return transactions;
  }

  public async createSaleTransaction(
    createTransactionDto: CreateTransactionDto,
  ) {
    const ids = createTransactionDto.products.map((product) => product.id);

    const dbProducts = await this.productRepo.find({
      where: {
        id: In(ids),
      },
    });

    let totalPrice = 0;
    let transactionDetails: TransactionDetail[] = [];
    // check whether the product data in dto exist in db or not
    for (const dto of createTransactionDto.products) {
      const checkedProduct = dbProducts.find(
        (dbProduct) => dbProduct.id === dto.id,
      );

      if (!checkedProduct) {
        throw new NotFoundException(`Produk dgn id ${dto.id} gk terdaftar`);
      }

      // handle stock availibility
      const { id: stockId, quantity: prevStockQuantity } = checkedProduct.stock;
      if (prevStockQuantity < dto.quantity) {
        throw new BadRequestException('Stok produk gak cukup');
      } else {
        const newStock = prevStockQuantity - dto.quantity;

        await this.stockService.updateStock(stockId, { quantity: newStock });
      }

      const subtotal = dto.quantity * checkedProduct.price;
      totalPrice += subtotal;

      const transactionDetail = this.transactionDetailRepo.create({
        product: checkedProduct,
        quantity: dto.quantity,
        subtotal,
      });

      transactionDetails.push(transactionDetail);
    }

    const { id: customerId, customerName } = createTransactionDto.customer;
    let customer = {};

    // if customer id provided, means the customer already (and should be) registered
    if (customerId) {
      customer = await this.customerService.getCustomerById(customerId);
    } else {
      // if only customer data provided (without id) means the customer is a new customer
      customer = await this.customerService.createCustomer({
        name: customerName,
      });
    }

    const transaction = await this.transactionRepo.save({
      totalPrice,
      type: createTransactionDto.type,
      details: transactionDetails,
      customer,
    });

    return await this.transactionRepo.save(transaction);
  }

  public async createRestockTransaction(
    createTransactionDto: CreateTransactionDto,
  ) {
    const ids = createTransactionDto.products.map((product) => product.id);

    const dbProducts = await this.productRepo.find({
      where: {
        id: In(ids),
      },
    });

    let totalPrice = 0;
    let transactionDetails: TransactionDetail[] = [];
    // check whether the product data in dto exist in db or not
    for (const dto of createTransactionDto.products) {
      const checkedProduct = dbProducts.find(
        (dbProduct) => dbProduct.id === dto.id,
      );

      if (!checkedProduct) {
        throw new NotFoundException(`Produk dgn id ${dto.id} gk terdaftar`);
      }

      // handle stock update
      const { id: stockId, quantity: prevStockQuantity } = checkedProduct.stock;
      const newStock = prevStockQuantity + dto.quantity;

      await this.stockService.updateStock(stockId, { quantity: newStock });

      const subtotal = dto.quantity * checkedProduct.price;
      totalPrice += subtotal;

      const transactionDetail = this.transactionDetailRepo.create({
        product: checkedProduct,
        quantity: dto.quantity,
        subtotal,
      });

      transactionDetails.push(transactionDetail);
    }

    const { id: customerId, customerName } = createTransactionDto.customer;
    let customer = {};

    // if customer id provided, means the customer already (and should be) registered
    if (customerId) {
      customer = await this.customerService.getCustomerById(customerId);
    } else if (customerName) {
      // if only customer data provided (without id) means the customer is a new customer
      customer = await this.customerService.createCustomer({
        name: customerName,
      });
    }

    const transaction = await this.transactionRepo.save({
      totalPrice,
      type: createTransactionDto.type,
      details: transactionDetails,
      customer,
    });

    return await this.transactionRepo.save(transaction);
  }
}
