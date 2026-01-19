export interface IEntity {
  update(context: GameContext): void;
  draw(ctx: CanvasRenderingContext2D): void;
  removeFromWorld: boolean;
}

export interface GameContext {
  clockTick: number;
  ctx: CanvasRenderingContext2D;
}

export interface IComponent {
  update(context: GameContext): void;
}