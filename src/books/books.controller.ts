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
    @UseGuards(AuthGuard())
    async getAllBooks(): Promise<Book[]> {
        return this.booksService.allBooks();
    }

    @Post('add')
    @UseGuards(AuthGuard())
    async addNewBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
        return this.booksService.addBook(createBookDto);
    }
    
    @Get('search')
    @UseGuards(AuthGuard())
    async searchBook(@Query() query: ExpressQuery): Promise<Book[]> {
        return await this.booksService.searchBook(query);
    }

    @Get(':id')
    @UseGuards(AuthGuard())
    async getSelectedBook(@Param('id') id: string): Promise<Book> {
        return await this.booksService.selectBook(id);
    } 

    @Put(':id')
    @UseGuards(AuthGuard())
    async updateBook(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto): Promise<Book> {
        return await this.booksService.updateBook(id, updateBookDto);
    }
    
    @Delete(':id')
    @UseGuards(AuthGuard())
    async deleteBook(@Param('id') id: string): Promise<Book> {
        return await this.booksService.deleteBook(id);
    }

}
