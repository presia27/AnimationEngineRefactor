import { Entity } from "../../entity.js";
import { MovementComponent } from "../../componentLibrary/movementComponent.js";
import { CatInputSystem } from "./catinputsys.js";
import { CatWrapAround } from "./catWrapAround.js";
import { BasicLifecycle } from "../../componentLibrary/lifecycle.js";
import { CatRenderer } from "./catRenderer.js";
export function buildCat(assetManager, inputSystem, ctx, defaultXY) {
    const catEntity = new Entity();
    const life = new BasicLifecycle();
    const movementCtl = new MovementComponent(defaultXY);
    const catInputCtl = new CatInputSystem(inputSystem, movementCtl, 200);
    const catWrapAroundCtl = new CatWrapAround(movementCtl, ctx);
    catEntity.addComponent(life);
    catEntity.addComponent(movementCtl);
    catEntity.addComponent(catInputCtl);
    catEntity.addComponent(catWrapAroundCtl);
    const renderer = new CatRenderer(assetManager, movementCtl, life);
    catEntity.setRenderer(renderer);
    return catEntity;
}
