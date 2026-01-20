/**
 * Very basic size component, suitable for most entities
 * whose physical composition doesn't really change much.
 * Size components describe the physical size of an entity
 * on the canvas space.
 */
export class BasicSize {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    update(context) {
        return;
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
}
