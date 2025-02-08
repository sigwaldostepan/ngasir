import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DataSource, Repository } from 'typeorm';
import { Product } from './product.entity';
import { StockService } from 'src/features/stock/stock.service';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    private productRepo: ProductRepository,
    private stockService: StockService,
  ) {}

  public async getProducts() {
    const products = await this.productRepo.find({
      relations: ['stock'],
    });

    return products;
  }

  public async getProductById(id: number) {
    const product = await this.productRepo.findOneBy({ id });

    if (!product) {
      throw new NotFoundException('Produk gak ketemu');
    }

    return product;
  }

  public async createProduct(createProductDto: CreateProductDto) {
    const product = this.productRepo.create({
      name: createProductDto.name,
      price: createProductDto.price,
    });

    const savedProduct = await this.productRepo.save(product);

    // create a new stock data for created product
    return await this.stockService.createStock({
      product: savedProduct,
      quantity: createProductDto.stock,
    });
  }

  public async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.getProductById(id);

    const newProductData = this.productRepo.merge(product, updateProductDto);

    return await this.productRepo.save(newProductData);
  }

  public async deleteProduct(id: number) {
    const product = await this.getProductById(id);

    return await this.productRepo.delete(product.id);
  }
}
