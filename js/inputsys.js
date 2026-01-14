/**
 * Reads input from peripheral devices
 */
export class InputSystem {
    constructor(ctx, debug) {
        this.ctx = ctx;
        this.debug = debug;
        this.leftClick = null;
        this.rightClick = null;
        this.cursor = null;
        this.wheel = null;
        this.keys = new Map();
        this.startInput();
    }
    startInput() {
        const getXandY = (e) => ({
            x: e.clientX - this.ctx.canvas.getBoundingClientRect().left,
            y: e.clientY - this.ctx.canvas.getBoundingClientRect().top
        });
        this.ctx.canvas.addEventListener("mousemove", e => {
            if (this.debug) {
                console.log("MOUSE_MOVE", getXandY(e));
            }
            this.cursor = getXandY(e);
        });
        this.ctx.canvas.addEventListener("click", e => {
            if (this.debug) {
                console.log("CLICK", getXandY(e));
            }
            this.leftClick = getXandY(e);
        });
        this.ctx.canvas.addEventListener("wheel", e => {
            if (this.debug) {
                console.log("WHEEL", getXandY(e), e.deltaX, e.deltaY);
            }
            e.preventDefault(); // Prevent Scrolling
            this.wheel = e;
        });
        this.ctx.canvas.addEventListener("contextmenu", e => {
            if (this.debug) {
                console.log("RIGHT_CLICK", getXandY(e));
            }
            e.preventDefault(); // Prevent Context Menu
            this.rightClick = getXandY(e);
        });
        this.ctx.canvas.addEventListener("keydown", event => this.keys.set(event.key.toLowerCase(), true));
        this.ctx.canvas.addEventListener("keyup", event => this.keys.set(event.key.toLowerCase(), false));
    }
}
