import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as multer from 'multer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: ['http://localhost:4200'],
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true,
  });

  const storage = multer.diskStorage({
    destination: '../images',
    filename(req, file, callback) {
      const uniqueSuffix =
        Date.now() + '-' + Math.round(Math.random() * 1e9);
      callback(null, file.fieldname + '-' + uniqueSuffix);
    },
  });
  app.use(multer({ storage: storage }).single('image'));


  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
