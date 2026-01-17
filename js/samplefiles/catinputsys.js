import { InputAction } from "../inputactionlist.js";
export class CatInputSystem {
    constructor(inputSys, movementSys) {
        this.inputSystem = inputSys;
        this.movementSystem = movementSys;
    }
    update(context) {
        this.movementSystem.update(context); // update the movement system
        const direction = { x: 0, y: 0 };
        if (this.inputSystem.isActionActive(InputAction.MOVE_UP)) {
            direction.y -= 1;
        }
        if (this.inputSystem.isActionActive(InputAction.MOVE_DOWN)) {
            direction.y += 1;
        }
        if (this.inputSystem.isActionActive(InputAction.MOVE_LEFT)) {
            direction.x -= 1;
        }
        if (this.inputSystem.isActionActive(InputAction.MOVE_RIGHT)) {
            direction.x += 1;
        }
        const magnitude = Math.sqrt(direction.x ** 2 + direction.y ** 2);
        if (magnitude > 0) {
            this.movementSystem.setVelocityCommand({
                direction,
                speed: this.movementSystem.speed
            });
        }
        else {
            this.movementSystem.setVelocityCommand(null);
        }
    }
}
