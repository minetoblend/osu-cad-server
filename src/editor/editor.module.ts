import { Module } from "@nestjs/common";
import { EditorGateway } from "./editor.gateway";
import { EditorRoomService } from "./editor.room.service";

@Module({
  providers: [
    EditorGateway,
    EditorRoomService
  ]
})
export class EditorModule {
}
