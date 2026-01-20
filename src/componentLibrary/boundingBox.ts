import { GameContext, IComponent, IPosition } from "../classinterfaces.ts";

/**
 * 
 */
export class BoundingBox implements IComponent {
  private positionMgr: IPosition;
  private left: number;
  private top: number;
  private right: number;
  private bottom: number;

  /**
   * 
   * @param x Initial X coordinate
   * @param y Initial Y coordinate
   * @param width Initial width
   * @param height Initial height
   * @param positionMgr Component that holds the current X-Y position of an entity
   */
  constructor(x: number, y: number, width: number, height: number, positionMgr: IPosition) {
   this.left = x;
   this.top = y;
   this.right = this.left + width;
   this.bottom = this.top + height; 
   this.positionMgr = positionMgr;
  }

  public update(context: GameContext): void {
    this.left = this.positionMgr.getPosition().x;
    this.top = this.positionMgr.getPosition().y;
  }

  public getLeft(): number {
    return this.left;
  }

  public getTop(): number {
    return this.top;
  }

  public getRight(): number {
    return this.right;
  }

  public getBottom(): number {
    return this.bottom;
  }

  public collide(oth: BoundingBox) {
    if (this.right > oth.getLeft() && this.left < oth.getRight()
      && this.top < oth.getBottom() && this.bottom > oth.getTop()) {
        return true;
    }
    return false;
  }
}
