import { Injectable, NotFoundException } from '@nestjs/common';
import { promises as fs } from 'fs';
import { Prisma } from 'generated/prisma/client.js';
import { join } from 'path';
import { PrismaService } from 'src/prisma/prisma.service.js';
import { ProductRequest } from 'src/types/index.js';
import { ProductGateway } from './product.gateway.js';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly productGateway: ProductGateway,
  ) {}

  async getProducts(status?: string) {
    const args: Prisma.ProductFindManyArgs = {};

    if (status === 'available') {
      args.where = { isSold: false };
    }

    const products = await this.prismaService.product.findMany(args);
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
      const createdProduct = await this.prismaService.product.create({
        data: {
          ...product,
          userId,
        },
      });
      this.productGateway.handleProductUpdated();
      return createdProduct;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  async updateProduct(productId: number, data: Prisma.ProductUpdateInput) {
    try {
      await this.prismaService.product.update({
        where: { id: productId },
        data,
      });
      this.productGateway.handleProductUpdated();
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
