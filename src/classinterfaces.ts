import { XY } from "./typeinterfaces.ts";

// export interface IEntity {
//   update(context: GameContext): void;
//   draw(ctx: CanvasRenderingContext2D): void;
//   removeFromWorld(): boolean;
// }

export interface IEntity {
  addComponent(component: IComponent): void;
  setRenderer(renderer: IRenderer): void;
  update(context: GameContext): void;
  draw(ctx: CanvasRenderingContext2D): void;
  getComponent<T extends IComponent>(component: new (...args: any[]) => T): T | undefined
}

export interface IRenderer {
  draw(ctx: CanvasRenderingContext2D, context: GameContext): void;
}

export interface GameContext {
  clockTick: number;
  ctx: CanvasRenderingContext2D;
}

export interface IComponent {
  update(context: GameContext): void;
}

export interface IPosition {
  getPosition(): XY;
}

export interface ILifecycle {
  isAlive(): boolean;
  die(): void;
  revive(): void;
}