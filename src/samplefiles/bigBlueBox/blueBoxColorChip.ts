import { GameContext, IComponent } from "../../classinterfaces.ts";

export class BlueBoxColor implements IComponent {
  private defaultColor: string;
  private color: string;

  constructor(defaultColor: string) {
    this.defaultColor = defaultColor;
    this.color = defaultColor;
  }

  public update(context: GameContext) {
    return;
  }

  public getColor(): string {
    return this.color;
  }

  public setColor(color: string): void {
    this.color = color;
  }

  public resetColor(): void {
    this.color = this.defaultColor;
  }
}