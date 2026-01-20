import { IEntity } from "../../classinterfaces.ts";
import { BasicSize } from "../../componentLibrary/BasicSize.ts";
import { BoundingBox } from "../../componentLibrary/boundingBox.ts";
import { BasicLifecycle } from "../../componentLibrary/lifecycle.ts";
import { staticPositionComponent } from "../../componentLibrary/staticPositionComponent.ts";
import { Entity } from "../../entity.ts";
import { BlueBoxCollisionHandler } from "./blueBoxCollisionHandler.ts";
import { BlueBoxColor } from "./blueBoxColorChip.ts";
import { BlueBoxRenderer } from "./blueBoxRenderer.ts";

export function buildBigBlueBox(): IEntity {
  const entity = new Entity();
  const life = new BasicLifecycle();
  const color = new BlueBoxColor("#00bfff");
  const position = new staticPositionComponent({x: 512, y: 512});
  const sizeMgr = new BasicSize(48, 48);
  const boundingBox = new BoundingBox(position, sizeMgr);
  const collisionHandler = new BlueBoxCollisionHandler(color);
  entity.addComponent(life);
  entity.addComponent(color);
  entity.addComponent(position);
  entity.addComponent(sizeMgr);
  entity.addComponent(boundingBox);
  entity.addComponent(collisionHandler);

  const renderer = new BlueBoxRenderer(position, sizeMgr, color);
  entity.setRenderer(renderer);
  
  return entity;
}