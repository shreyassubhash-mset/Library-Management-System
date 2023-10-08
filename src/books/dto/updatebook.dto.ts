import { IsEnum, IsOptional, IsString } from "class-validator";
import { Category } from "../schema/books.schema";

export class UpdateBookDto {

    @IsOptional()
    readonly image: Express.Multer.File;

    @IsOptional()
    @IsString()
    readonly title: string;

    @IsOptional()
    @IsString()
    readonly description: string;

    @IsOptional()
    @IsString()
    readonly author: string;

    @IsOptional()
    @IsEnum(Category, { message: 'Please enter the correct catagory!' })
    readonly category: Category;
}