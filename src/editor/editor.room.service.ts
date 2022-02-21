import { Injectable } from "@nestjs/common";
import { EditorRoom } from "./editor.room";
import { Server } from "socket.io";

@Injectable()
export class EditorRoomService {

  readonly rooms = {};

  async getOrCreateRoom(server: Server, beatmap: number) {
    if (!this.rooms[beatmap])
      this.rooms[beatmap] = new EditorRoom(server);
    return this.rooms[beatmap];
  }
}
