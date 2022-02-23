import { Module } from '@nestjs/common';
import { BeatmapService } from './beatmap.service';
import { BeatmapController } from './beatmap.controller';
import {HttpModule} from "@nestjs/axios";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Beatmap } from './beatmap.entity';
import { BeatmapSet } from './beatmap.set.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Beatmap, BeatmapSet])],
  providers: [BeatmapService],
  controllers: [BeatmapController],
  exports: [BeatmapService]
})
export class BeatmapModule {}
