import { Module } from '@nestjs/common';
import { BeatmapService } from './beatmap.service';
import { BeatmapController } from './beatmap.controller';
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  providers: [BeatmapService],
  controllers: [BeatmapController]
})
export class BeatmapModule {}
