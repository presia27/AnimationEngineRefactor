import { IComponent, IEntity, ISize } from "../../classinterfaces.ts";
import { AbstractCollisionHandler } from "../../componentLibrary/AbstractCollisionHandler.ts";
import { BoundingBox } from "../../componentLibrary/boundingBox.ts";
import { MovementComponent } from "../../componentLibrary/movementComponent.ts";
import { BlueBoxTagFile } from "../bigBlueBox/blueBoxTagFile.ts";

export class CatCollisionHandler extends AbstractCollisionHandler {
  boundingBox: BoundingBox;
  movementCtl: MovementComponent;
  sizeCtl: ISize;

  constructor(boundingBox: BoundingBox, movementCtl: MovementComponent, sizeCtl: ISize) {
    super();

    this.boundingBox = boundingBox;
    this.movementCtl = movementCtl;
    this.sizeCtl = sizeCtl;
  }

  override handleCollision(oth: IEntity, othBB: BoundingBox): void {
    const tag: IComponent | undefined = oth.getComponent(BlueBoxTagFile);

    // handle collisions for the Blue Box
    if (tag && tag instanceof BlueBoxTagFile) {
      // calculate the middle of the other bounding box
      const xMidPoint = (othBB.getLeft() + othBB.getRight()) / 2;
      const yMidPoint = (othBB.getTop() + othBB.getBottom()) / 2;
      if (this.boundingBox.getRight() > othBB.getLeft()
          && this.boundingBox.getRight() < xMidPoint
        ) {
        // set position to the left of the object
        this.movementCtl.setPosition({
          x: othBB.getLeft() - this.sizeCtl.getWidth(),
          y: this.movementCtl.getPosition().y
        });

        // set the movement velocity to 0 on the x axis, allow movement on y
        this.movementCtl.setVelocityCommand({
          direction: {
            x: 0,
            y: this.movementCtl.getCurrentDirection().y
          },
          magnitude: this.movementCtl.getSpeed()
        });
      }
      else if (this.boundingBox.getLeft() < othBB.getRight()
        && this.boundingBox.getLeft() > xMidPoint
      ) {
        this.movementCtl.setPosition({
          x: othBB.getRight(),
          y: this.movementCtl.getPosition().y
        });

        this.movementCtl.setVelocityCommand({
          direction: {
            x: 0,
            y: this.movementCtl.getCurrentDirection().y
          },
          magnitude: this.movementCtl.getSpeed()
        });
      }
      else if (this.boundingBox.getTop() < othBB.getBottom()
        && this.boundingBox.getTop() > yMidPoint
      ) {
        this.movementCtl.setPosition({
          x: this.movementCtl.getPosition().x,
          y: othBB.getBottom()
        });

        this.movementCtl.setVelocityCommand({
          direction: {
            x: this.movementCtl.getCurrentDirection().x,
            y: 0
          },
          magnitude: this.movementCtl.getSpeed()
        });
      }
      else if (this.boundingBox.getBottom() > othBB.getTop()
        && this.boundingBox.getBottom() < yMidPoint
      ) {
        this.movementCtl.setPosition({
          x: this.movementCtl.getPosition().x,
          y: othBB.getTop() - this.sizeCtl.getHeight()
        });

        this.movementCtl.setVelocityCommand({
          direction: {
            x: this.movementCtl.getCurrentDirection().x,
            y: 0
          },
          magnitude: this.movementCtl.getSpeed()
        });
      }
    }
  }
}