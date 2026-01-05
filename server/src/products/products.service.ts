import { Injectable, NotFoundException } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import { PrismaService } from 'src/prisma/prisma.service.js';
import { ProductRequest } from 'src/types/index.js';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getProducts() {
    const products = await this.prismaService.product.findMany();
    return Promise.all(
      products.map(async (product) => {
        return {
          ...product,
          image: await this.checkImgExists(product.id),
        };
      }),
    );
  }

  async getProductById(productId: number) {
    try {
      return {
        ...(await this.prismaService.product.findFirstOrThrow({
          where: { id: productId },
        })),
        image: await this.checkImgExists(productId),
      };
    } catch (error) {
      console.log(error);
      throw new NotFoundException(
        `Product not found with next id: ${productId}`,
      );
    }
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

  private async checkImgExists(productId: number) {
    try {
      await fs.access(
        join(__dirname, '../../', `public/products/${productId}`),
        fs.constants.F_OK,
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
