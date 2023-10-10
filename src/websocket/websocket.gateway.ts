import { OnModuleInit } from '@nestjs/common';
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  }
})
export class WebsocketGateway implements OnModuleInit{
  @WebSocketServer()
  server: Server;

  onModuleInit() {
      this.server.on('connection', (socket) => {
        console.log(socket.id);
        console.log("connected");
      })
  }

  @SubscribeMessage('notification')
  onNotification(@MessageBody() body: any) {
    console.log(body);
    this.server.emit('onNotification', body);
  }
}
