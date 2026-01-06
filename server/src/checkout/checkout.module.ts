import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service.js';
import { CheckoutController } from './checkout.controller.js';
import Stripe from 'stripe';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsModule } from 'src/products/products.module.js';

@Module({
  imports: [ConfigModule, ProductsModule],
  providers: [
    CheckoutService,
    {
      provide: Stripe,
      useFactory: (configService: ConfigService) =>
        new Stripe(configService.getOrThrow('STRIPE_SECRET_KEY')),
      inject: [ConfigService],
    },
  ],
  controllers: [CheckoutController],
})
export class CheckoutModule {}
