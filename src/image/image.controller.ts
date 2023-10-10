import { Controller, Get, HttpStatus, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Controller('image')
export class ImageController {

    @Post('add')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './images',
            filename: (req, file, callBack) => {
                const fileName = path.parse(file.originalname).name.replace(/\s/g, '') + Date.now();
                const extension = path.parse(file.originalname).ext;
                callBack(null, `${fileName}${extension}`);
            }
        })
    }))
    async addImage(@Res() res, @UploadedFile() file ) : Promise<any>  {
        return res.status(HttpStatus.OK).json({
            success: true,
            data: file.path
        });
    }

    @Get('photo')
    async getImage() {
        const image = { "image" : 'book1696959052131.jpg'};
        return image;
    }
}
