export interface IEntity {
  update(): void;
  draw(ctx: CanvasRenderingContext2D): void;
  removeFromWorld: boolean;
}

export interface GameContext {
  clockTick: number;
  ctx: CanvasRenderingContext2D;
}

export interface IUpdatable {
  update(context: GameContext): void;
}