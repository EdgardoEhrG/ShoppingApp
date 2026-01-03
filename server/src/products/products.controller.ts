import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/guard/index.js';
import type { ProductRequest, TokenPayload } from '../types/index.js';
import { CurrentUser } from 'src/auth/current-user.js';
import { ProductsService } from './products.service.js';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  @UseGuards(JWTAuthGuard)
  async getProducts() {
    return this.productService.getProducts();
  }

  @Post()
  @UseGuards(JWTAuthGuard)
  async createProduct(
    @Body() product: ProductRequest,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.productService.createProduct(product, user.userId);
  }
}
