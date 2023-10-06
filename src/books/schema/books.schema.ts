import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum Category {
    ADVENTURE = 'Adventure',
    FANTASY = 'Fantasy',
    HISTORY = 'History',
    CRIME = 'Crime',
}
@Schema({
    timestamps: true
})

export class Book extends Document{

    @Prop({required: true})
    title: string;

    @Prop({required: true})
    description: string;

    @Prop({required: true})
    author: string;

    @Prop({required: true})
    category: Category;
}

export const BooksSchema = SchemaFactory.createForClass(Book)