import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/guard/index.js';
import type { ProductRequest, TokenPayload } from '../types/index.js';
import { CurrentUser } from 'src/auth/current-user.js';
import { ProductsService } from './products.service.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  @UseGuards(JWTAuthGuard)
  async getProducts() {
    return this.productService.getProducts();
  }

  @Post(':productId/image')
  @UseGuards(JWTAuthGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'public/products',
        filename: (req, file, callback) => {
          callback(
            null,
            `${req.params.productId}${extname(file.originalname)}`,
          );
        },
      }),
    }),
  )
  async uploadProductImg(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 500000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    _file: Express.Multer.File,
  ) {}

  @Post()
  @UseGuards(JWTAuthGuard)
  async createProduct(
    @Body() product: ProductRequest,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.productService.createProduct(product, user.userId);
  }
}
