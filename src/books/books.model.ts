import { Schema, Document } from "mongoose";

export enum Category {
    ADVENTURE = 'Adventure',
    FANTASY = 'Fantasy',
    HISTORY = 'History',
    CRIME = 'Crime',
}
export interface Book extends Document {
    title: string;
    description: string;
    author: string;
    category: Category;
}

export const BooksSchema = new Schema<Book>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, enum: Object.values(Category), required: true }
},
{
     timestamps :true 
});