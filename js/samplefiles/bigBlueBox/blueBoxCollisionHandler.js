import { AbstractCollisionHandler } from "../../componentLibrary/AbstractCollisionHandler.js";
export class BlueBoxCollisionHandler extends AbstractCollisionHandler {
    constructor(color) {
        super();
        this.color = color;
    }
    handleCollision(oth, boundingBox) {
        this.color.setColor("#ff4500");
    }
}
