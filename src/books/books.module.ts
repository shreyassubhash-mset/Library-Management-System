import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksSchema } from './schema/books.schema';
import { UsersModule } from 'src/users/users.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MulterModule.register({
    dest: './images', // Define the upload destination directory
  }),
  UsersModule, MongooseModule.forFeature([{ name: 'Book', schema: BooksSchema }])],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
