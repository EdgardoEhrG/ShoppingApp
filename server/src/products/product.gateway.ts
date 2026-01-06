import {
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ProductGateway {
  constructor(private readonly authService: AuthService) {}

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @WebSocketServer()
  private readonly server: Server;

  handleProductUpdated() {
    this.server.emit('ProductUpdated');
  }

  handleConnection(client: Socket) {
    try {
      this.authService.verifyToken(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        client.handshake.auth.Authentication.value,
      );
    } catch (error) {
      console.log(error);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      throw new WsException('Unauthorized');
    }
  }
}
