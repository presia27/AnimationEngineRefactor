import { GameContext } from "../classinterfaces.ts";
import { MovementSystem } from "../movementsys.ts";
import { Animator } from "../animator.ts"
import { XY } from "../typeinterfaces.ts";
import { InputSystem } from "../inputsys.ts";
import { CatInputSystem } from "./catinputsys.ts";

const catSpeed = 200;

class Cat {
  spritesheet: string = "../../../assets/Cat"
  gameContext: GameContext;
  movementController: MovementSystem;
  catInputSystem: CatInputSystem;
  animations: Animator[]; // list of animation states/frames

  constructor(gameContext: GameContext, inputSystem: InputSystem, defaultXY: XY) {
    this.gameContext = gameContext;
    this.movementController = new MovementSystem(defaultXY, catSpeed);
    this.catInputSystem = new CatInputSystem(inputSystem, this.movementController);
    this.animations = [];

    this.loadAnimations();
  }

  private loadAnimations() {
    this.animations.push()
  }
}