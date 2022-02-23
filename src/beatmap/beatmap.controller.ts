import { Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from "../auth/jtw.auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import * as id3 from 'node-id3'
import { diskStorage } from 'multer';
import * as path from 'path';

import { readFile } from 'fs';
import { BeatmapService } from './beatmap.service';
@Controller('api/beatmap')
export class BeatmapController {

    constructor(private readonly beatmapService: BeatmapService) {
    }

    @Post('mp3')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './tmp'
        })
    }))
    async createFromMp3(@Req() req, @UploadedFile() file: Express.Multer.File) {
        const filepath = path.resolve(file.destination, file.filename)

        const beatmapset = await this.beatmapService.createFromMp3(filepath)
        return {
            createdBeatmapSet: beatmapset?.id || null
        }
    }

}
