import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from './schema/transaction.schema';
import { Model } from 'mongoose';
import { Book } from 'src/books/schema/books.schema';
import { User } from 'src/users/schema/users.schema';

@Injectable()
export class TransactionService {
    constructor(@InjectModel(Transaction.name) private readonly transactionModel: Model<Transaction>, @InjectModel(Book.name) private readonly booksModel: Model<Book>, @InjectModel(User.name) private readonly usersModel: Model<User>) {}

    async borrowBook(userId: string, bookId: string): Promise<Transaction> {
        const borrowedBook = await this.booksModel.findById(bookId);

        if(!borrowedBook) {
            throw new NotFoundException('Book not found');
        }

        const borrowedUser = await this.usersModel.findById(userId);

        if(!borrowedUser) {
            throw new NotFoundException('User not found');
        }

        const transaction = await this.transactionModel.create({
            user: userId,
            book: bookId,
            status: 'Borrowed',
            borrowedDate: new Date(),
        })
       borrowedBook.status = 'Not available';
       await borrowedBook.save();


        return transaction;
    }

    async returnBook(id: string): Promise<Transaction> {
        const transaction = await this.transactionModel.findById(id);

        if(!transaction) {
            throw new NotFoundException('Transaction not found');
        }

        transaction.status = 'Returned';
        transaction.returnedDate = new Date();

        const borrowedBook = await this.booksModel.findById(transaction.book);
        borrowedBook.status = 'Available';
        await borrowedBook.save();

        await transaction.save();
        return transaction;
    }

    async transactionHistory(userId: string): Promise<Transaction[]> {
        const transactions = await this.transactionModel.find({ user: userId }).populate('book').sort({createdAt: -1});

        if(!transactions) {
            throw new NotFoundException('No transaction history found');
        }

        return transactions;
    }
}
