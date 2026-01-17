import { MovementSystem } from "../movementsys.js";
import { Animator } from "../animator.js";
import { CatInputSystem } from "./catinputsys.js";
import { catImageAssets } from "./assetlist.js";
const catSpeed = 200;
const catSpriteName = "catSprite";
export class Cat {
    constructor(assetManager, gameContext, inputSystem, defaultXY) {
        var _a;
        this.gameContext = gameContext;
        this.movementController = new MovementSystem(defaultXY, catSpeed);
        this.catInputSystem = new CatInputSystem(inputSystem, this.movementController);
        this.animations = [];
        this.removeFromWorld = false;
        // get spritesheet
        const imagePath = (_a = catImageAssets.find((item) => item.name === catSpriteName)) === null || _a === void 0 ? void 0 : _a.location;
        if (imagePath === undefined) {
            throw new Error("Unable to find asset for this entity");
        }
        // set spritesheet from blob
        const imageData = assetManager.getAsset(imagePath);
        this.spritesheet = new Image();
        const objectUrl = URL.createObjectURL(imageData);
        this.spritesheet.src = objectUrl;
        this.spritesheet.onload = () => {
            URL.revokeObjectURL(objectUrl);
        };
        this.loadAnimations();
    }
    loadAnimations() {
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
    update(context) {
        this.gameContext = context;
        this.catInputSystem.update(context);
    }
    draw(ctx) {
        var _a;
        ctx.imageSmoothingEnabled = false;
        (_a = this.animations[0]) === null || _a === void 0 ? void 0 : _a.drawFrame(this.gameContext.clockTick, ctx, this.movementController.position.x, this.movementController.position.y, 4);
    }
}
