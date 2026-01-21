import { GameContext } from "../../classinterfaces";
import { BasicSize } from "../../componentLibrary/BasicSize.ts";
import { XY } from "../../typeinterfaces.ts";

export enum Direction {
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

export class CatSizeOrientation extends BasicSize {
  private directionIntent: XY = {x: 0, y: 0};

  constructor(width: number, height: number, scale: number) {
    super(width, height, scale);
  }

  override update(context: GameContext): void {
    const direction = this.getDirectionMap();
    switch (direction) {
      case Direction.RIGHT:
        this.width = 28; this.height = 23; break;
      case Direction.DOWNLEFT:
      case Direction.DOWNRIGHT:
        this.width = 25; this.height = 25; break;
      case Direction.IDLE:
      case Direction.DOWN:
        this.width = 14; this.height = 29; break;
      case Direction.LEFT:
      case Direction.RIGHT:
        this.width = 28; this.height = 23; break;
      case Direction.UPLEFT:
      case Direction.UPRIGHT:
        this.width = 24; this.height = 23; break;
      case Direction.UP:
        this.width = 14; this.height = 24; break;
    }
  }

  public getDirectionIntent() {
    return this.directionIntent
  }

  public getDirectionMap(): Direction {
    const x = this.directionIntent.x;
    const y = this.directionIntent.y;
    if (x > 0 && y === 0) return Direction.RIGHT;
    else if (x > 0  && y > 0) return Direction.DOWNRIGHT;
    else if (x === 0 && y > 0) return Direction.DOWN;
    else if (x < 0 && y > 0) return Direction.DOWNLEFT;
    else if (x < 0 && y === 0) return Direction.LEFT;
    else if (x < 0 && y < 0) return Direction.UPLEFT; 
    else if (x === 0 && y < 0) return Direction.UP;
    else if (x > 0 && y < 0) return Direction.UPRIGHT;
    else return Direction.IDLE;
  }

  public setDirectionIntent(intent: XY) {
    this.directionIntent = intent;
  }
}