import { MovementComponent } from "../componentLibrary/movementComponent.ts";
import { GameContext, IComponent } from "../classinterfaces.ts";
import { InputSystem } from "../inputsys.ts";
import { XY } from "../typeinterfaces.ts";
import { InputAction } from "../inputactionlist.ts";

export class CatInputSystem implements IComponent {
  inputSystem: InputSystem;
  movementSystem: MovementComponent;

  constructor(inputSys: InputSystem, movementSys: MovementComponent) {
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
      // normalize movement by dividing out the magnitude, leaving only a direction vector
      direction.x = direction.x / magnitude;
      direction.y = direction.y / magnitude;

      this.movementSystem.setVelocityCommand({
        direction,
        magnitude: this.movementSystem.getSpeed()
      });
    } else {
      this.movementSystem.setVelocityCommand(null);
    }
  }
}