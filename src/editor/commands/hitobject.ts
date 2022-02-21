import { RoomClient } from "../editor.room";
import { HitCircle } from "../editorContext";
import { v4 as uuid } from "uuid";

interface Vec2 {
  x: number
  y: number
}

interface CreateHitCirclePayload {
  time: number
  position: Vec2
}

export function createHitCircle(client: RoomClient, payload: CreateHitCirclePayload) {
  const hitObject: HitCircle = {
    type: "hitcircle",
    time: payload.time,
    position: payload.position,
    uuid: uuid()
  };

  client.room.context.insertHitObject<HitCircle>(hitObject);
  client.room.broadcast("createHitObject", {
    user: client.uuid,
    hitObject: hitObject
  });
}

export function removeHitObject(client: RoomClient, uuid: string) {
  client.room.context.removeHitObject(uuid);
  client.room.broadcast("removeHitObject", {
    user: client.room.uuid,
    hitObject: uuid
  });
}