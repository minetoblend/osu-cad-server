import { Server, Socket } from "socket.io";
import { v4 as uuid } from "uuid";
import { EditorContext } from "./editorContext";
import { createHitCircle, removeHitObject } from "./commands/hitobject";

export class RoomClient {
  readonly uuid: any;

  constructor(private readonly client: Socket, readonly room: EditorRoom) {
    this.uuid = uuid;

    this.setupCallbacks(client);
  }

  send(evt: string, payload: any) {
    this.client.emit(evt, payload);
  }

  private setupCallbacks(client: Socket) {
    client.on("createHitCircle", hitcircle => createHitCircle(this, hitcircle));
    client.on("removeHitObject", uuid => removeHitObject(this, uuid))
  }
}

export class EditorRoom {
  constructor(private readonly server: Server) {
  }

  readonly context = new EditorContext();

  readonly uuid = uuid();

  clients: RoomClient[] = [];

  join(client: Socket) {
    const roomClient = new RoomClient(client, this);
    this.clients.push(roomClient);
    client.join(this.uuid);
    this.syncClient(roomClient);
  }

  broadcast(ev: string, payload: any) {
    this.server.to(this.room).emit(ev, payload);
  }

  get room() {
    return this.uuid;
  }

  private syncClient(client: RoomClient) {
    this.broadcast("pause", { sync: client.uuid });
    client.send("loadContext", this.context.serialize());
    this.broadcast("resume", { sync: client.uuid });
  }
}