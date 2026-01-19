import { GameContext, IComponent, IRenderer, IEntity2 } from "./classinterfaces.ts";

class Entity implements IEntity2 {
  private components: IComponent[] = [];
  private renderer: IRenderer | null = null;

  public addComponent(component: IComponent): void {
    this.components.push(component);
  }

  public setRenderer(renderer: IRenderer): void {
    this.renderer = renderer;
  }

  public update(context: GameContext): void {
    for (const component of this.components) {
      component.update(context);
    }
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    if (this.renderer !== null) {
      this.renderer.draw(ctx);
    }
  }
}