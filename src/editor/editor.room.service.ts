import { Injectable } from "@nestjs/common";
import { EditorRoom } from "./editor.room";
import { Server } from "socket.io";
import { BeatmapService } from "src/beatmap/beatmap.service";

@Injectable()
export class EditorRoomService {

  readonly rooms : {[key:string]: EditorRoom | Promise<EditorRoom>} = {};

  constructor( private readonly beatmapService: BeatmapService) {

  }

  async getOrCreateRoom(server: Server, id: string) {
    if (!this.rooms[id])
      {
        const promise = new Promise<EditorRoom>(async (resolve, reject) => {
          const beatmap = await this.beatmapService.getBeatmapById(id)
          resolve(new EditorRoom(server, beatmap))
        }) 
        this.rooms[id] = promise
        const room = await promise
        this.rooms[id] = room
        return room
      }
    if(this.rooms[id] instanceof Promise)
      return await this.rooms[id]
    return this.rooms[id];
  }
}
