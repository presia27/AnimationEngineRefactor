import { IEntity } from "../../classinterfaces.ts";
import { BasicSize } from "../../componentLibrary/BasicSize.ts";
import { BoundingBox } from "../../componentLibrary/boundingBox.ts";
import { BasicLifecycle } from "../../componentLibrary/lifecycle.ts";
import { staticPositionComponent } from "../../componentLibrary/staticPositionComponent.ts";
import { Entity } from "../../entity.ts";
import { BlueBoxRenderer } from "./blueBoxRenderer.ts";

export function buildBigBlueBox(): IEntity {
  const entity = new Entity();
  const life = new BasicLifecycle();
  const position = new staticPositionComponent({x: 512, y: 512});
  const sizeMgr = new BasicSize(48, 48);
  const boundingBox = new BoundingBox(position, sizeMgr);
  entity.addComponent(life);
  entity.addComponent(position);
  entity.addComponent(sizeMgr);
  entity.addComponent(boundingBox);

  const renderer = new BlueBoxRenderer(position, sizeMgr);
  entity.setRenderer(renderer);
  
  return entity;
}