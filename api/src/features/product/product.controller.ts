import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  HttpCode,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts() {
    const products = await this.productService.getProducts();

    return {
      data: products,
    };
  }

  @Get(':id')
  async getProductById(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productService.getProductById(+id);

    return {
      data: product,
    };
  }

  @Post()
  @HttpCode(201)
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.createProduct(createProductDto);

    return {
      message: 'Produk berhasil ditambahin',
      data: product,
    };
  }

  @Put(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const updatedProduct = await this.productService.updateProduct(
      +id,
      updateProductDto,
    );

    return {
      data: updatedProduct,
    };
  }

  @Delete(':id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    await this.productService.deleteProduct(id);

    return {
      message: 'Produk berhasil dihapus',
    };
  }
}
