import { IEntity } from "../../classinterfaces.ts";
import AssetManager from "../../assetmanager.ts";
import { InputSystem } from "../../inputsys.ts";
import { XY } from "../../typeinterfaces.ts";
import { Entity } from "../../entity.ts";
import { MovementComponent } from "../../componentLibrary/movementComponent.ts";
import { CatInputSystem } from "./catinputsys.ts";
import { BasicLifecycle } from "../../componentLibrary/lifecycle.ts";
import { CatRenderer } from "./catRenderer.ts";

export function buildCat(
  assetManager: AssetManager,
  inputSystem: InputSystem,
  defaultXY: XY): IEntity {
    const catEntity = new Entity();
    const life = new BasicLifecycle();
    const movementCtl = new MovementComponent(defaultXY);
    const catInputCtl = new CatInputSystem(inputSystem, movementCtl, 200);
    catEntity.addComponent(life);
    catEntity.addComponent(movementCtl);
    catEntity.addComponent(catInputCtl);

    const renderer = new CatRenderer(assetManager, movementCtl, life);
    catEntity.setRenderer(renderer);

    return catEntity;
}