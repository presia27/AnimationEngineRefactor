import { BasicSize } from "../../componentLibrary/BasicSize.js";
export var Direction;
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
export class CatSizeOrientation extends BasicSize {
    constructor(width, height, scale) {
        super(width, height, scale);
        this.directionIntent = { x: 0, y: 0 };
    }
    update(context) {
        const direction = this.getDirectionMap();
        switch (direction) {
            case Direction.RIGHT:
                this.width = 28;
                this.height = 23;
                break;
            case Direction.DOWNLEFT:
            case Direction.DOWNRIGHT:
                this.width = 25;
                this.height = 25;
                break;
            case Direction.IDLE:
            case Direction.DOWN:
                this.width = 14;
                this.height = 29;
                break;
            case Direction.LEFT:
            case Direction.RIGHT:
                this.width = 28;
                this.height = 23;
                break;
            case Direction.UPLEFT:
            case Direction.UPRIGHT:
                this.width = 24;
                this.height = 23;
                break;
            case Direction.UP:
                this.width = 14;
                this.height = 24;
                break;
        }
    }
    getDirectionIntent() {
        return this.directionIntent;
    }
    getDirectionMap() {
        const x = this.directionIntent.x;
        const y = this.directionIntent.y;
        if (x > 0 && y === 0)
            return Direction.RIGHT;
        else if (x > 0 && y > 0)
            return Direction.DOWNRIGHT;
        else if (x === 0 && y > 0)
            return Direction.DOWN;
        else if (x < 0 && y > 0)
            return Direction.DOWNLEFT;
        else if (x < 0 && y === 0)
            return Direction.LEFT;
        else if (x < 0 && y < 0)
            return Direction.UPLEFT;
        else if (x === 0 && y < 0)
            return Direction.UP;
        else if (x > 0 && y < 0)
            return Direction.UPRIGHT;
        else
            return Direction.IDLE;
    }
    setDirectionIntent(intent) {
        this.directionIntent = intent;
    }
}
