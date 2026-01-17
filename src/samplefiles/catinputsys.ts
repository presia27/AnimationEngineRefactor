import { MovementSystem } from "../movementsys.ts";
import { GameContext, IUpdatable } from "../classinterfaces.ts";
import { InputSystem } from "../inputsys.ts";
import { XY } from "../typeinterfaces.ts";
import { InputAction } from "../inputactionlist.ts";

export class CatInputSystem implements IUpdatable {
  inputSystem: InputSystem;
  movementSystem: MovementSystem;

  constructor(inputSys: InputSystem, movementSys: MovementSystem) {
    this.inputSystem = inputSys;
    this.movementSystem = movementSys;
  }

  update(context: GameContext) {
    const direction: XY = { x: 0, y: 0 };

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
      })
    } else {
      this.movementSystem.setVelocityCommand(null);
    }
  }
}