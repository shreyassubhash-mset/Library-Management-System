import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Category } from '../schema/books.schema';

export class CreateBookDto {
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