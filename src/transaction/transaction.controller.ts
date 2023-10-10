import { Controller, Post, Param, Body, Get, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from './schema/transaction.schema';
import { AuthGuard } from '@nestjs/passport';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';

@Controller('transaction')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService, private readonly websocketGateway: WebsocketGateway) {}

    @Post('borrow/:userId/:bookId')
    async borrowBook(@Param('userId') userId: string, @Param('bookId') bookId: string): Promise<Transaction> {
      const transaction = this.transactionService.borrowBook(userId, bookId);
      return transaction;
    }

    @Post('return/:id')
    async returnBook(@Param('id') id: string): Promise<Transaction> {
      const transaction = this.transactionService.returnBook(id);
      return transaction;
    }

    @Get('history/:userId')
  async viewTransactionHistory(@Param('userId') userId: string): Promise<Transaction[]> {
    return this.transactionService.transactionHistory(userId);
  }
}
