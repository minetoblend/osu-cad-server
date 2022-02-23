import {Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/jtw.auth.guard";
import {FileInterceptor} from "@nestjs/platform-express";
import id3 from 'node-id3'

@Controller('api/beatmap')
export class BeatmapController {

    constructor() {
    }

    @Post('mp3')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    createFromMp3(@Req() req, @UploadedFile() file: Express.Multer.File) {
        return new Promise((resolve, reject) => {
            id3.read(file.destination, (err, tags) => {
                if (err)
                    reject(err)
                else
                    resolve(tags)
            })
        })
    }

}
