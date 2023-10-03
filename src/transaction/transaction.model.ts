import { Schema, Document } from "mongoose";

export interface Transaction extends Document {
    
}

export const TransactionsSchema = new Schema<Transaction>({

});