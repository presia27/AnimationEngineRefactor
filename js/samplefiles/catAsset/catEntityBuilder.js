import { Entity } from "../../entity.js";
import { MovementComponent } from "../../componentLibrary/movementComponent.js";
import { CatInputSystem } from "../catinputsys.js";
import { BasicLifecycle } from "../../componentLibrary/lifecycle.js";
export function buildCat(assetManager, gameContext, inputSystem, defaultXY) {
    const catEntity = new Entity();
    const life = new BasicLifecycle();
    const movementCtl = new MovementComponent(defaultXY, 200);
    const catInputCtl = new CatInputSystem(inputSystem, movementCtl);
    catEntity.addComponent(life);
    catEntity.addComponent(movementCtl);
    catEntity.addComponent(catInputCtl);
    // const renderer = new CatRenderer();
    // catEntity.setRenderer();
    return catEntity;
}
