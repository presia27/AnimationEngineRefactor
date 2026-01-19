export interface IEntity {
  update(context: GameContext): void;
  draw(ctx: CanvasRenderingContext2D): void;
  removeFromWorld(): boolean;
}

export interface IEntity2 {
  addComponent(component: IComponent): void;
  setRenderer(renderer: IRenderer): void;
  update(context: GameContext): void;
  draw(ctx: CanvasRenderingContext2D): void;
}

export interface IRenderer {
  draw(ctx: CanvasRenderingContext2D): void;
}

export interface GameContext {
  clockTick: number;
  ctx: CanvasRenderingContext2D;
}

export interface IComponent {
  update(context: GameContext): void;
}