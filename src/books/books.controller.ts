import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './books.model';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) {}

    @Get()
    async getAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
        return this.booksService.allBooks(query);
    }

    @Post('add')
    async addNewBook(@Body() book: Book): Promise<Book> {
        return this.booksService.addBook(book);
    }

    @Get(':id')
    async getSelectedBook(@Param('id') id: string): Promise<Book> {
        return await this.booksService.selectBook(id);
    } 

    @Put(':id')
    async updateBook(@Param('id') id: string, @Body() book: Book): Promise<Book> {
        return await this.booksService.updateBook(id, book);
    }
    
    @Delete(':id')
    async deleteBook(@Param('id') id: string): Promise<Book> {
        return await this.booksService.deleteBook(id);
    }

    @Get('search')
    async searchBook(@Query() query: ExpressQuery): Promise<Book[]> {
        return await this.booksService.searchBook(query);
    }
}
