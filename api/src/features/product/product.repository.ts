import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {
    super(productRepo.target, productRepo.manager, productRepo.queryRunner);
  }
}
