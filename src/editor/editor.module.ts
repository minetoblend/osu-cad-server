import { Module } from "@nestjs/common";
import { BeatmapModule } from "src/beatmap/beatmap.module";
import { EditorGateway } from "./editor.gateway";
import { EditorRoomService } from "./editor.room.service";

@Module({
  imports: [
    BeatmapModule
  ],
  providers: [
    EditorGateway,
    EditorRoomService
  ]
})
export class EditorModule {
}
