import { GameContext, IComponent, ISize } from "../classinterfaces";

/**
 * Very basic size component, suitable for most entities
 * whose physical composition doesn't really change much.
 * Size components describe the physical size of an entity
 * on the canvas space.
 */
export class BasicSize implements IComponent, ISize {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
  update(context: GameContext): void {
    return;
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }
}