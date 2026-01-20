/**
 * Very basic size component, suitable for most entities
 * whose physical composition doesn't really change much.
 * Size components describe the physical size of an entity
 * on the canvas space.
 */
export class BasicSize {
    constructor(width, height, scale) {
        this.scale = scale;
        this.width = width * scale;
        this.height = height * scale;
    }
    update(context) {
        return;
    }
    getScale() {
        return this.scale;
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
}
