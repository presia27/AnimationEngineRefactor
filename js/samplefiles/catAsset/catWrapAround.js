/**
 * If the cat goes off the screen, send a movement
 * vector to wrap it back around.
 */
export class CatWrapAround {
    constructor(movementSys, ctx) {
        this.movementSystem = movementSys;
        this.ctx = ctx;
    }
    update(context) {
        const currentX = this.movementSystem.getPosition().x;
        const currentY = this.movementSystem.getPosition().y;
        const boundX = this.ctx.canvas.width;
        const boundY = this.ctx.canvas.height;
        if (currentX < 0) {
            this.movementSystem.setPosition({
                x: boundX,
                y: currentY
            });
        }
        ;
        if (currentY < 0) {
            this.movementSystem.setPosition({
                x: currentX,
                y: boundY
            });
        }
        if (currentX > boundX) {
            this.movementSystem.setPosition({
                x: 0,
                y: currentY
            });
        }
        if (currentY > boundY) {
            this.movementSystem.setPosition({
                x: currentX,
                y: 0
            });
        }
    }
}
