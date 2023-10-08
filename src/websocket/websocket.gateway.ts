import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: any) {
    // Handle WebSocket connection
  }

  handleDisconnect(client: any) {
    // Handle WebSocket disconnection
  }

  // Implement methods to send notifications to connected clients
  sendBorrowNotification(userId: string ,bookId: string) {
    this.server.emit('borrowed', { userId, bookId });
  }

  sendReturnNotification(bookId: string) {
    this.server.emit('returned', { bookId });
  }
}
