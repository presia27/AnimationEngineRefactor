export interface IEntity {
  update(): void;
  draw(ctx: CanvasRenderingContext2D): void;
  removeFromWorld: boolean;
}