import { MovementComponent } from "../../componentLibrary/movementComponent.ts";
import { Animator } from "../../animator.ts";
import { GameContext, IRenderer } from "../../classinterfaces.ts";
import { BasicLifecycle } from "../../componentLibrary/lifecycle.ts";
import AssetManager from "../../assetmanager.ts";

const catSpriteName = "catSprite";

enum Direction {
  UPLEFT = 0,
  UP = 1,
  UPRIGHT = 2,
  LEFT = 3,
  IDLE = 4,
  RIGHT = 5,
  DOWNLEFT = 6,
  DOWN = 7,
  DOWNRIGHT = 8
}

export class CatRenderer implements IRenderer {
  spritesheet: HTMLImageElement;
  animations: Animator[];
  movementMgr: MovementComponent;
  lifeMgr: BasicLifecycle;

  constructor(assetManager: AssetManager, movementMgr: MovementComponent, lifeMgr: BasicLifecycle) {
    this.movementMgr = movementMgr;
    this.lifeMgr = lifeMgr;
    this.animations = [];

    // get spritesheet
    const imageData = assetManager.getImageAsset(catSpriteName);
    if (imageData === null) {
      throw new Error("Failed to load the Cat sprite");
    }
    this.spritesheet = imageData;

    this.loadAnimations();
  }

  private loadAnimations() {
    this.animations.push(new Animator(this.spritesheet, 100, 41, 24, 23, 3, 0.15, 8, true, true, false)); // upleft
    this.animations.push(new Animator(this.spritesheet, 9, 104, 14, 24, 3, 0.1, 18, false, true, true)); // up
    this.animations.push(new Animator(this.spritesheet, 100, 105, 24, 23, 3, 0.15, 8, false, true, false)); // upright
    this.animations.push(new Animator(this.spritesheet, 2, 41, 28, 23, 3, 0.15, 4, false, true, false)); // left
    this.animations.push(new Animator(this.spritesheet, 41, 3, 14, 29, 1, 1, 18, false, true, false)); // idle
    this.animations.push(new Animator(this.spritesheet, 2, 73, 28, 23, 3, 0.15, 4, false, true, false)); // right
    this.animations.push(new Animator(this.spritesheet, 100, 7, 25, 25, 3, 0.15, 7, false, true, false)); // downleft
    this.animations.push(new Animator(this.spritesheet, 9, 3, 14, 29, 3, 0.1, 18, false, true, true)); // down
    this.animations.push(new Animator(this.spritesheet, 99, 71, 25, 25, 3, 0.15, 7, false, true, false)); // downright  
  }

  private getDirectionMap(): Direction {
    const degrees = this.movementMgr.getCurrentDirectionDegrees();
    if (degrees >= -22.5 && degrees < 22.5) return Direction.RIGHT;
      else if (degrees >= 22.5 && degrees < 67.5) return Direction.DOWNRIGHT;
      else if (degrees >= 67.5 && degrees < 112.5) return Direction.DOWN;
      else if (degrees >= 112.5 && degrees < 157.5) return Direction.DOWNLEFT;
      else if (degrees >= 157.5 || degrees < -157.5) return Direction.LEFT;
      else if (degrees >= -157.5 && degrees < -112.5) return Direction.UPLEFT;
      else if (degrees >= -112.5 && degrees < -67.5) return Direction.UP;
      else if (degrees >= -67.5 && degrees < -22.5) return Direction.UPRIGHT;
      else return Direction.IDLE;
  }

  public draw(ctx: CanvasRenderingContext2D, context: GameContext): void {
    ctx.imageSmoothingEnabled = false;
    this.animations[this.getDirectionMap()]?.drawFrame(context.clockTick, ctx, this.movementMgr.getPosition().x, this.movementMgr.getPosition().y, 4);
  }
}