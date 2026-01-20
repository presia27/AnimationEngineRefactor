import { Animator } from "../../animator.js";
const catSpriteName = "catSprite";
var Direction;
(function (Direction) {
    Direction[Direction["UPLEFT"] = 0] = "UPLEFT";
    Direction[Direction["UP"] = 1] = "UP";
    Direction[Direction["UPRIGHT"] = 2] = "UPRIGHT";
    Direction[Direction["LEFT"] = 3] = "LEFT";
    Direction[Direction["IDLE"] = 4] = "IDLE";
    Direction[Direction["RIGHT"] = 5] = "RIGHT";
    Direction[Direction["DOWNLEFT"] = 6] = "DOWNLEFT";
    Direction[Direction["DOWN"] = 7] = "DOWN";
    Direction[Direction["DOWNRIGHT"] = 8] = "DOWNRIGHT";
})(Direction || (Direction = {}));
export class CatRenderer {
    constructor(assetManager, movementMgr, lifeMgr) {
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
    getDirectionMap() {
        const degrees = this.movementMgr.getCurrentDirectionDegrees();
        const speed = this.movementMgr.getSpeed();
        if (speed === 0)
            return Direction.IDLE;
        if (degrees >= -22.5 && degrees < 22.5)
            return Direction.RIGHT;
        else if (degrees >= 22.5 && degrees < 67.5)
            return Direction.DOWNRIGHT;
        else if (degrees >= 67.5 && degrees < 112.5)
            return Direction.DOWN;
        else if (degrees >= 112.5 && degrees < 157.5)
            return Direction.DOWNLEFT;
        else if (degrees >= 157.5 || degrees < -157.5)
            return Direction.LEFT;
        else if (degrees >= -157.5 && degrees < -112.5)
            return Direction.UPLEFT;
        else if (degrees >= -112.5 && degrees < -67.5)
            return Direction.UP;
        else if (degrees >= -67.5 && degrees < -22.5)
            return Direction.UPRIGHT;
        else
            return Direction.IDLE;
    }
    draw(context) {
        var _a;
        const ctx = context.ctx;
        ctx.imageSmoothingEnabled = false;
        (_a = this.animations[this.getDirectionMap()]) === null || _a === void 0 ? void 0 : _a.drawFrame(context.clockTick, ctx, this.movementMgr.getPosition().x, this.movementMgr.getPosition().y, 4);
    }
}
