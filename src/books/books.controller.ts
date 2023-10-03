import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './schema/books.schema';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { CreateBookDto } from './dto/createbook.dto';
import { UpdateBookDto } from './dto/updatebook.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) {}

    @Get()
    async getAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
        return this.booksService.allBooks(query);
    }

    @Post('add')
    @UseGuards(AuthGuard())
    async addNewBook(@Body() book: CreateBookDto): Promise<Book> {
        return this.booksService.addBook(book);
    }

    @Get(':id')
    async getSelectedBook(@Param('id') id: string): Promise<Book> {
        return await this.booksService.selectBook(id);
    } 

    @Put(':id')
    async updateBook(@Param('id') id: string, @Body() book: UpdateBookDto): Promise<Book> {
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
