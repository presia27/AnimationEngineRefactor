import { GameContext, IPosition, IRenderer, ISize } from "../../classinterfaces.ts";

export class BlueBoxRenderer implements IRenderer {
  private positionMgr: IPosition;
  private sizeMgr: ISize;

  constructor(positionMgr: IPosition, sizeMgr: ISize) {
    this.positionMgr = positionMgr;
    this.sizeMgr = sizeMgr;
  }

  draw(context: GameContext): void {
    const ctx = context.ctx;
    ctx.save();
    ctx.fillStyle = "#00bfff"
    ctx.fillRect(
      this.positionMgr.getPosition().x,
      this.positionMgr.getPosition().y,
      this.sizeMgr.getWidth(),
      this.sizeMgr.getHeight());
    ctx.restore();
  }
}