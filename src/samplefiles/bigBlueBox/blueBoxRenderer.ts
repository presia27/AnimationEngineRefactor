import { GameContext, IPosition, IRenderer, ISize } from "../../classinterfaces.ts";
import { BlueBoxColor } from "./blueBoxColorChip.ts";

export class BlueBoxRenderer implements IRenderer {
  private positionMgr: IPosition;
  private sizeMgr: ISize;
  private color: BlueBoxColor;

  constructor(positionMgr: IPosition, sizeMgr: ISize, color: BlueBoxColor) {
    this.positionMgr = positionMgr;
    this.sizeMgr = sizeMgr;
    this.color = color;
  }

  draw(context: GameContext): void {
    const ctx = context.ctx;
    ctx.save();
    ctx.fillStyle = this.color.getColor();
    ctx.fillRect(
      this.positionMgr.getPosition().x,
      this.positionMgr.getPosition().y,
      this.sizeMgr.getWidth(),
      this.sizeMgr.getHeight());

    if (context.debug) {
      ctx.strokeStyle = "#ff0000";
      ctx.strokeRect(
        this.positionMgr.getPosition().x,
        this.positionMgr.getPosition().y,
        this.sizeMgr.getWidth(),
        this.sizeMgr.getHeight()
      )
    }

    ctx.restore();
  }
}