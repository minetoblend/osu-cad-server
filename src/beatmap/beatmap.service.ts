import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Beatmap } from './beatmap.entity';
import { BeatmapSet } from './beatmap.set.entity';
import * as fs from 'fs'
import { promisify } from 'util';
import * as mp3Duration from 'get-mp3-duration'

@Injectable()
export class BeatmapService {

    constructor(
        @InjectRepository(Beatmap)
        private readonly beatmapRepository: Repository<Beatmap>,
        @InjectRepository(BeatmapSet)
        private readonly beatmapSetRepository: Repository<BeatmapSet>
    ) {
    }

    async createFromMp3(path: string): Promise<BeatmapSet | null> {
        const set = new BeatmapSet()
        try {
            const content = await promisify(fs.readFile)(path)
            const duration = mp3Duration(content)
            if (duration > 0) {
                set.duration = duration

                const res = await this.beatmapSetRepository.insert(set)

                const id = set.id

                await promisify(fs.mkdir)(`data/beatmapsets/${id}`, { recursive: true })
                await promisify(fs.rename)(path, `data/beatmapsets/${id}/audio.mp3`)

                return set
            } else throw Error()
        } catch (e) {
            try {
                await promisify(fs.unlink)(path)
            } catch (e) { }
            return null
        }
    }

}
