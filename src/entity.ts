import { GameContext, IComponent, IRenderer, IEntity } from "./classinterfaces.ts";

export class Entity implements IEntity {
  private components: IComponent[] = [];
  private renderer: IRenderer | null = null;
  private gameContext: GameContext | null = null;

  public addComponent(component: IComponent): void {
    this.components.push(component);
  }

  public setRenderer(renderer: IRenderer): void {
    this.renderer = renderer;
  }

  public update(context: GameContext): void {
    this.gameContext = context; // update context field for draw method
    for (const component of this.components) {
      component.update(context);
    }
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    if (this.renderer !== null && this.gameContext !== null) {
      this.renderer.draw(ctx, this.gameContext);
    }
  }

  // Originally had components: any, changed to
  // TypeScript generic with Claude's help
  public getComponent<T extends IComponent>(
    component: new (...args: any[]) => T): T | undefined {
    return this.components.find(c => c instanceof component) as T | undefined;
  }
}