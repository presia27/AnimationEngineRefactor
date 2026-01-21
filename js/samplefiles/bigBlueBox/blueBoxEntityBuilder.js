import { BasicSize } from "../../componentLibrary/BasicSize.js";
import { BoundingBox } from "../../componentLibrary/boundingBox.js";
import { BasicLifecycle } from "../../componentLibrary/lifecycle.js";
import { staticPositionComponent } from "../../componentLibrary/staticPositionComponent.js";
import { Entity } from "../../entity.js";
import { BlueBoxCollisionHandler } from "./blueBoxCollisionHandler.js";
import { BlueBoxColor } from "./blueBoxColorChip.js";
import { BlueBoxRenderer } from "./blueBoxRenderer.js";
import { BlueBoxTagFile } from "./blueBoxTagFile.js";
export function buildBigBlueBox(initXY) {
    const entity = new Entity();
    const tagFile = new BlueBoxTagFile();
    const life = new BasicLifecycle();
    const color = new BlueBoxColor("#00bfff");
    const position = new staticPositionComponent(initXY);
    const sizeMgr = new BasicSize(48, 48, 1);
    const boundingBox = new BoundingBox(position, sizeMgr);
    const collisionHandler = new BlueBoxCollisionHandler(color);
    entity.addComponent(tagFile);
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
