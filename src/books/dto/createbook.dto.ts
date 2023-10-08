import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Category } from '../schema/books.schema';
import { Express } from 'express';

export class CreateBookDto {

    @IsOptional()
    readonly image: Express.Multer.File;
    
    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsString()
    readonly author: string;

    @IsNotEmpty()
    @IsEnum(Category, { message: 'Please enter correct category!' })
    readonly category: Category;
}