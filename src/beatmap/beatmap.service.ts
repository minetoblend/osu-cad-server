import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Beatmap } from './beatmap.entity';
import { BeatmapSet } from './beatmap.set.entity';
import * as fs from 'fs'
import { promisify } from 'util';
import * as mp3Duration from 'get-mp3-duration'
import { User } from 'src/user/user.entity';

@Injectable()
export class BeatmapService {

    constructor(
        @InjectRepository(Beatmap)
        private readonly beatmapRepository: Repository<Beatmap>,
        @InjectRepository(BeatmapSet)
        private readonly beatmapSetRepository: Repository<BeatmapSet>
    ) {
    }

    async createFromMp3(path: string, user: User): Promise<BeatmapSet | null> {
        const set = new BeatmapSet()
        set.creator = user
        try {
            const content = await promisify(fs.readFile)(path)
            const duration = mp3Duration(content)
            if (duration > 0) {
                set.duration = duration

                const res = await this.beatmapSetRepository.insert(set)

                const id = set.id

                const diff = new Beatmap()
                diff.beatmapSet = set

                await this.beatmapRepository.insert(diff)

                await promisify(fs.mkdir)(`data/beatmapsets/${id}`, { recursive: true })
                await promisify(fs.rename)(path, `data/beatmapsets/${id}/audio.mp3`)

                set.beatmaps = [diff]

                return set
            } else throw Error()
        } catch (e) {
            try {
                await promisify(fs.unlink)(path)
            } catch (e) { }
            return null
        }
    }

   async getAllSetsByCreator(creator: User) {
        return this.beatmapSetRepository
        .find({
            where: {creator},
            relations: ['beatmaps'],
        })
   }

   async getBeatmapById(id: string) {
        return this.beatmapRepository.findOne(id, {
            relations: ['beatmapSet']
        })
   }

}
