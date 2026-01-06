import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/guard/index.js';
import { SessionRequest } from 'src/types/index.js';
import { CheckoutService } from './checkout.service.js';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post('session')
  @UseGuards(JWTAuthGuard)
  async createSession(@Body() request: SessionRequest) {
    return this.checkoutService.createSession(request.productId);
  }

  @Post('webhook')
  @UseGuards(JWTAuthGuard)
  handleCheckoutWebhook(@Body() event: any) {
    return this.checkoutService.handleCheckoutWebhook(event);
  }
}
