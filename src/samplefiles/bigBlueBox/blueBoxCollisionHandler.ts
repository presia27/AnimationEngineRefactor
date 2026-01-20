import { IEntity } from "../../classinterfaces.ts";
import { AbstractCollisionHandler } from "../../componentLibrary/AbstractCollisionHandler.ts";
import { BoundingBox } from "../../componentLibrary/boundingBox.ts";
import { BlueBoxColor } from "./blueBoxColorChip.ts";

export class BlueBoxCollisionHandler extends AbstractCollisionHandler {
  color: BlueBoxColor;
  constructor(color: BlueBoxColor) {
    super();
    this.color = color;
  }

  override handleCollision(oth: IEntity, boundingBox: BoundingBox): void {
    this.color.setColor("#ff4500");
  }
}