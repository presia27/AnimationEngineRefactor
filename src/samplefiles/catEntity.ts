import { GameContext, IEntity } from "../classinterfaces.ts";
import { MovementSystem } from "../movementsys.ts";
import { Animator } from "../animator.ts"
import { XY } from "../typeinterfaces.ts";
import { InputSystem } from "../inputsys.ts";
import { CatInputSystem } from "./catinputsys.ts";
import { catImageAssets } from "./assetlist.ts";
import AssetManager from "../assetmanager.ts";

const catSpeed = 200;
const catSpriteName = "catSprite";

export class Cat implements IEntity {
  spritesheet: HTMLImageElement;
  gameContext: GameContext;
  movementController: MovementSystem;
  catInputSystem: CatInputSystem;
  animations: Animator[]; // list of animation states/frames
  removeFromWorld: boolean;

  constructor(assetManager: AssetManager, gameContext: GameContext, inputSystem: InputSystem, defaultXY: XY) {
    this.gameContext = gameContext;
    this.movementController = new MovementSystem(defaultXY, catSpeed);
    this.catInputSystem = new CatInputSystem(inputSystem, this.movementController);
    this.animations = [];
    this.removeFromWorld = false;

    // get spritesheet
    const imagePath = catImageAssets.find((item) => item.name === catSpriteName)?.location;
    if (imagePath === undefined) {
      throw new Error("Unable to find asset for this entity");
    }
    // set spritesheet from blob
    const imageData: Blob = assetManager.getAsset(imagePath);
    this.spritesheet = new Image();
    const objectUrl = URL.createObjectURL(imageData);
    this.spritesheet.src = objectUrl;
    this.spritesheet.onload = () => { // cleanup data
      URL.revokeObjectURL(objectUrl);
    }

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

  update(context: GameContext) {
    this.gameContext = context;
    this.catInputSystem.update(context);
  }
  
  draw(ctx: CanvasRenderingContext2D) {
    ctx.imageSmoothingEnabled = false;
    this.animations[0]?.drawFrame(this.gameContext.clockTick, ctx, this.movementController.position.x, this.movementController.position.y, 4);
  }
}