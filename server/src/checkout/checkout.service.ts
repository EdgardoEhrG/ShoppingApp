import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProductsService } from 'src/products/products.service.js';
import Stripe from 'stripe';

@Injectable()
export class CheckoutService {
  constructor(
    private readonly stripe: Stripe,
    private readonly productService: ProductsService,
    private readonly configService: ConfigService,
  ) {}

  async createSession(productId: number) {
    const product = await this.productService.getProductById(productId);
    return this.stripe.checkout.sessions.create({
      metadata: {
        productId,
      },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: product.price * 100,
            product_data: {
              name: product.name,
              description: product.description,
            },
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: this.configService.getOrThrow('STRIPE_SUCCESS_URL'),
      cancel_url: this.configService.getOrThrow('STRIPE_CANCEL_URL'),
    });
  }

  async handleCheckoutWebhook(event: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (event.type !== 'checkout.session.completed') {
      return;
    }

    const session = await this.stripe.checkout.sessions.retrieve(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      event.data.object.id,
    );

    if (session && session.metadata) {
      await this.productService.updateProduct(
        parseInt(session.metadata.productId),
        {
          isSold: true,
        },
      );
    }
  }
}
