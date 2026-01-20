import { BasicSize } from "../../componentLibrary/BasicSize.js";
import { BoundingBox } from "../../componentLibrary/boundingBox.js";
import { BasicLifecycle } from "../../componentLibrary/lifecycle.js";
import { staticPositionComponent } from "../../componentLibrary/staticPositionComponent.js";
import { Entity } from "../../entity.js";
import { BlueBoxRenderer } from "./blueBoxRenderer.js";
export function buildBigBlueBox() {
    const entity = new Entity();
    const life = new BasicLifecycle();
    const position = new staticPositionComponent({ x: 512, y: 512 });
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
