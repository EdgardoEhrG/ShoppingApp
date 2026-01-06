import { Module } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { ProductsController } from './products.controller.js';
import { PrismaModule } from 'src/prisma/prisma.module.js';
import { ProductGateway } from './product.gateway.js';
import { AuthModule } from 'src/auth/auth.module.js';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ProductsService, ProductGateway],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
