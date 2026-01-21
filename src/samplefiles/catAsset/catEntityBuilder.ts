import { IEntity } from "../../classinterfaces.ts";
import AssetManager from "../../assetmanager.ts";
import { InputSystem } from "../../inputsys.ts";
import { XY } from "../../typeinterfaces.ts";
import { Entity } from "../../entity.ts";
import { MovementComponent } from "../../componentLibrary/movementComponent.ts";
import { CatInputSystem } from "./catinputsys.ts";
import { CatWrapAround } from "./catWrapAround.ts";
import { BasicLifecycle } from "../../componentLibrary/lifecycle.ts";
import { CatRenderer } from "./catRenderer.ts";
import { BoundingBox } from "../../componentLibrary/boundingBox.ts";
import { CatTagFile } from "./catTagFile.ts";
import { CatCollisionHandler } from "./catCollisionHandler.ts";
import { CatSizeOrientation } from "./catSizeOrientation.ts";

export function buildCat(
  assetManager: AssetManager,
  inputSystem: InputSystem,
  ctx: CanvasRenderingContext2D,
  defaultXY: XY): IEntity {
    const catEntity = new Entity();
    const tagFile = new CatTagFile();
    const life = new BasicLifecycle();
    const movementCtl = new MovementComponent(defaultXY);
    const sizeComponent = new CatSizeOrientation(25, 25, 4); // FIXME use a dynamic version instead
    const boundingBox = new BoundingBox(movementCtl, sizeComponent);
    const catInputCtl = new CatInputSystem(inputSystem, movementCtl, sizeComponent, 200);
    const catWrapAroundCtl = new CatWrapAround(movementCtl, ctx);
    const catCollisionHandler = new CatCollisionHandler(boundingBox, movementCtl, sizeComponent);
    catEntity.addComponent(tagFile);
    catEntity.addComponent(life);
    catEntity.addComponent(movementCtl);
    catEntity.addComponent(sizeComponent);
    catEntity.addComponent(boundingBox);
    catEntity.addComponent(catInputCtl);
    catEntity.addComponent(catWrapAroundCtl);
    catEntity.addComponent(catCollisionHandler);

    const renderer = new CatRenderer(assetManager, movementCtl, life, sizeComponent);
    catEntity.setRenderer(renderer);

    return catEntity;
}