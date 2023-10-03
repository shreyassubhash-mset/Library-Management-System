import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './books.model';
import { Model } from 'mongoose';
import { Query } from 'express-serve-static-core';

@Injectable()
export class BooksService {
    constructor(@InjectModel('Book') private readonly bookModel: Model<Book>) {}
    
    async allBooks(query: Query): Promise<Book[]> {

        const bookPerPage = 2;
        const currentPage = Number(query.page) || 1;
        const skipBooks = bookPerPage * (currentPage - 1);

        const allBooks = await this.bookModel.find().limit(bookPerPage).skip(skipBooks);
        return allBooks;
    }

    async addBook(book: Book): Promise<Book> {
        const newBook = await this.bookModel.create(book);
        return newBook;
    }

    async selectBook(id: string): Promise<Book> {
        const selectedBook = await this.bookModel.findById(id);
        return  selectedBook ;
    }

    async updateBook(id: string, book: Book): Promise<Book> {
        const updatedBook = await this.bookModel.findByIdAndUpdate(id, book, {
            new: true,
            runValidators: true,
        });
        return updatedBook;
    }

    async deleteBook(id: string): Promise<Book> {
        const deletedBook = await this.bookModel.findByIdAndDelete(id);
        return deletedBook;
    }

    async searchBook(query: Query): Promise<Book[]> {

        const keyword = query.keyword ? {
            title: {
                $regex: query.keyword,
                $options: 'i'
            }
        } : {}
        const books = await this.bookModel.find({...keyword}); 
        return books;
    }
}
