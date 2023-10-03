import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from './schema/transaction.schema';
import { Model } from 'mongoose';

@Injectable()
export class TransactionService {
    constructor(@InjectModel(Transaction.name) private tansactionModel: Model<Transaction>) {}

    async borrowBooks()
}
