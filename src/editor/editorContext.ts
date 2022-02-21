export class EditorContext {

  serialize() {
    return {
      hitObjects: this.hitObjects.map(serializeHitObject)
    };
  }

  readonly hitObjects: HitObject[] = [];

  constructor() {
    this.hitObjects.push(
    );
  }

  insertHitObject<T extends HitObject>(hitObject: T) {
    this.hitObjects.push(hitObject);
  }

  removeHitObject(uuid: string) {
    const index = this.hitObjects.findIndex(hitObject => hitObject.uuid === uuid);
    if (index >= 0)
      this.hitObjects.splice(index, 1);
  }
}


interface HitObject {
  uuid: string
  type: string
  time: number
  position: { x: number, y: number }
}

export interface HitCircle extends HitObject {
  type: "hitcircle"
}

function serializeHitObject(hitObject: HitObject) {
  return hitObject;
}