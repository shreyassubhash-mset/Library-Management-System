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
  sendBorrowNotification() {
    this.server.emit('borrowed', "Borrowed Successfully");
  }

  sendReturnNotification() {
    this.server.emit('returned', "Returned Book");
  }
}
