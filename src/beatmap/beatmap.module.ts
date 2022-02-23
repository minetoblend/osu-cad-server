import { Module } from '@nestjs/common';
import { BeatmapService } from './beatmap.service';
import { BeatmapController } from './beatmap.controller';

@Module({
  providers: [BeatmapService],
  controllers: [BeatmapController]
})
export class BeatmapModule {}
