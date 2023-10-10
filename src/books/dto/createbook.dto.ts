import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Category } from '../schema/books.schema';


export class CreateBookDto {

    @IsOptional()
    readonly image: string;
    
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