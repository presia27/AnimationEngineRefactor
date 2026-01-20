import { Entity } from "../../entity.js";
import { MovementComponent } from "../../componentLibrary/movementComponent.js";
import { CatInputSystem } from "./catinputsys.js";
import { CatWrapAround } from "./catWrapAround.js";
import { BasicLifecycle } from "../../componentLibrary/lifecycle.js";
import { CatRenderer } from "./catRenderer.js";
import { BasicSize } from "../../componentLibrary/BasicSize.js";
import { BoundingBox } from "../../componentLibrary/boundingBox.js";
export function buildCat(assetManager, inputSystem, ctx, defaultXY) {
    const catEntity = new Entity();
    const life = new BasicLifecycle();
    const movementCtl = new MovementComponent(defaultXY);
    const sizeComponent = new BasicSize(25, 25, 4); // FIXME use a dynamic version instead
    const boundingBox = new BoundingBox(movementCtl, sizeComponent);
    const catInputCtl = new CatInputSystem(inputSystem, movementCtl, 200);
    const catWrapAroundCtl = new CatWrapAround(movementCtl, ctx);
    catEntity.addComponent(life);
    catEntity.addComponent(movementCtl);
    catEntity.addComponent(sizeComponent);
    catEntity.addComponent(boundingBox);
    catEntity.addComponent(catInputCtl);
    catEntity.addComponent(catWrapAroundCtl);
    const renderer = new CatRenderer(assetManager, movementCtl, life, sizeComponent);
    catEntity.setRenderer(renderer);
    return catEntity;
}
