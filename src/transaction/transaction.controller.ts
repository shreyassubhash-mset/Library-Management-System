import { Controller, Post, Param, Body, Get, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from './schema/transaction.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('transaction')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Post('borrow/:userId/:bookId')
    async borrowBook(@Param('userId') userId: string, @Param('bookId') bookId: string): Promise<Transaction> {
        return this.transactionService.borrowBook(userId, bookId);
    }

    @Post('return/:id')
    async returnBook(@Param('id') id: string): Promise<Transaction> {
        return this.transactionService.returnBook(id);
    }

    @Get('history/:userId')
  async viewTransactionHistory(@Param('userId') userId: string): Promise<Transaction[]> {
    return this.transactionService.transactionHistory(userId);
  }
}
