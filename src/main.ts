import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as multer from 'multer';
import { join } from 'path';
import * as express from 'express';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: ['http://localhost:4200'],
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true,
  });


  app.use(express.static(__dirname +'./images/'));

  const storage = multer.diskStorage({
    destination: 'C:/Users/SHREYAS/Documents/GitHub/library-management-system/images/',
    filename(req, file, callback) {
      const uniqueSuffix =
        Date.now() + '-' + Math.round(Math.random() * 1e9);
        const fileExt = file.originalname.split('.').pop();
      callback(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExt );
    },
  });

  const upload = multer({ storage: storage }).single('image');
  app.use(upload);


  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
