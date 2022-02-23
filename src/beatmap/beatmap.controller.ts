import { Controller, Get, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from "../auth/jtw.auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import * as id3 from 'node-id3'
import { diskStorage } from 'multer';
import * as path from 'path';

import { createReadStream, readFile } from 'fs';
import { BeatmapService } from './beatmap.service';
import { User } from 'src/user/user.entity';
import { Response } from 'express';
import { fileURLToPath } from 'url';
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
        const user = req.user! as User

        const beatmapset = await this.beatmapService.createFromMp3(filepath, user)
        return {
            createdBeatmap: beatmapset?.beatmaps[0]?.id || null
        }
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    getAll(@Req() req) {
        const sets = this.beatmapService.getAllSetsByCreator(req.user!)
        return sets
    }

    @Get(':id/audio')
    getBeatmapAudio(@Param('id') id: string, @Res() res: Response) {
        const stream = createReadStream(path.resolve('data/beatmapsets', id, 'audio.mp3'))
        stream.pipe(res)
    }
}
