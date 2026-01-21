import { AbstractCollisionHandler } from "../../componentLibrary/AbstractCollisionHandler.js";
import { BlueBoxTagFile } from "../bigBlueBox/blueBoxTagFile.js";
export class CatCollisionHandler extends AbstractCollisionHandler {
    constructor(boundingBox, movementCtl, sizeCtl) {
        super();
        this.boundingBox = boundingBox;
        this.movementCtl = movementCtl;
        this.sizeCtl = sizeCtl;
    }
    handleCollision(oth, othBB) {
        const tag = oth.getComponent(BlueBoxTagFile);
        // handle collisions for the Blue Box
        if (tag && tag instanceof BlueBoxTagFile) {
            if (this.boundingBox.getRight() > othBB.getLeft()) {
                // this.movementCtl.setPosition({
                //   x: this.movementCtl.getPosition().x - 1,
                //   y: this.movementCtl.getPosition().y
                // });
                // this.movementCtl.setVelocityCommand({
                //   direction: this.movementCtl.getCurrentDirection(),
                //   magnitude: 0.01
                // });
                this.movementCtl.setPosition({
                    x: othBB.getLeft() - this.sizeCtl.getWidth(),
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
            // else if (this.boundingBox.getLeft() < othBB.getRight()) {
            //   this.movementCtl.setVelocityCommand({
            //     direction: {x: 1, y: 0},
            //     magnitude: 6
            //   });
            // }
            // else if (this.boundingBox.getTop() < othBB.getBottom()) {
            //   this.movementCtl.setVelocityCommand({
            //     direction: {x: 0, y: 1},
            //     magnitude: 6
            //   });
            // }
            // else if (this.boundingBox.getBottom() > othBB.getTop()) {
            //   this.movementCtl.setVelocityCommand({
            //     direction: {x: 0, y: -1},
            //     magnitude: 6
            //   });
            // }
        }
    }
}
