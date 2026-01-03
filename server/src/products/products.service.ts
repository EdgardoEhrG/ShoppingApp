import { Injectable } from '@nestjs/common';
import { Product } from 'generated/prisma/browser.js';
import { PrismaService } from 'src/prisma/prisma.service.js';
import { ProductRequest } from 'src/types/index.js';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getProducts(): Promise<Product[]> {
    return await this.prismaService.product.findMany();
  }

  async createProduct(product: ProductRequest, userId: number) {
    try {
      return await this.prismaService.product.create({
        data: {
          ...product,
          userId,
        },
      });
    } catch (error) {
      console.log(error);

      throw error;
    }
  }
}
