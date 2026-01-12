/**
 * Main Game Engine Script, refactored in TypeScript from Dr. Chris Marriott's game engine template
 * 
 * Original comment: This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011
 * @author Preston Sia, KV Le, Chris Marriott, Seth Ladd
 */

import { IEntity } from "./classinterfaces.ts";
import { Timer } from "./timer.ts";

interface mouseXY {
  x: number,
  y: number
}

export default class GameEngine {
  running: boolean;
  ctx: CanvasRenderingContext2D;
  timer: Timer;
  clockTick: number; // elapsed time in seconds since the last clock tick
  entities: IEntity[];
  click: mouseXY | null;
  rightClick: mouseXY | null;
  mouse: mouseXY | null; // mouse move
  wheel: WheelEvent | null;
  keys: Map<string, boolean>;

  options: any;

  constructor(ctx: CanvasRenderingContext2D, options: Object) {
    this.running = false;

    // What you will use to draw
    // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
    this.ctx = ctx;

    this.timer = new Timer();
    this.clockTick = 0;

    // Everything that will be updated and drawn each frame
    this.entities = [];

    // Information on the input
    this.click = null;
    this.rightClick = null;
    this.mouse = null;
    this.wheel = null;
    this.keys = new Map();

    // Options and the Details
    this.options = options || {
      debugging: false,
    };

    this.startInput();
  };

  /**
   * Reinitialize the game engine to a new canvas
   * @param ctx Reference to the HTML canvas 2D rendering context
   */
  init(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.startInput();
    this.timer = new Timer();
  };

  start() {
    this.running = true;
    const gameLoop = () => {
      this.loop();
      requestAnimationFrame(gameLoop);
    };
    gameLoop();
  };

  startInput() {
    // client area is the area visible on the webpage
    // The canvas boundingClientRect is the location of the canvas on the page
    const getXandY = (e: MouseEvent | WheelEvent | PointerEvent) => ({
      x: e.clientX - this.ctx.canvas.getBoundingClientRect().left,
      y: e.clientY - this.ctx.canvas.getBoundingClientRect().top
    });

    this.ctx.canvas.addEventListener("mousemove", e => {
      if (this.options.debugging) {
          console.log("MOUSE_MOVE", getXandY(e));
      }
      this.mouse = getXandY(e);
    });

    this.ctx.canvas.addEventListener("click", e => {
      if (this.options.debugging) {
          console.log("CLICK", getXandY(e));
      }
      this.click = getXandY(e);
    });

    this.ctx.canvas.addEventListener("wheel", e => {
      if (this.options.debugging) {
        console.log("WHEEL", getXandY(e), e.deltaX, e.deltaY);
      }
      e.preventDefault(); // Prevent Scrolling
      this.wheel = e;
    });

    this.ctx.canvas.addEventListener("contextmenu", e => {
      if (this.options.debugging) {
        console.log("RIGHT_CLICK", getXandY(e));
      }
      e.preventDefault(); // Prevent Context Menu
      this.rightClick = getXandY(e);
    });

    this.ctx.canvas.addEventListener("keydown", event => this.keys.set(event.key.toLowerCase(), true));
    this.ctx.canvas.addEventListener("keyup", event => this.keys.set(event.key.toLowerCase(), false));
  };

  addEntity(entity: IEntity) {
    this.entities.push(entity);
  };

  draw() {
    if (this.ctx !== null) {
      // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

      // Draw latest things first
      for (let i = this.entities.length - 1; i >= 0; i--) {
        this.entities[i]?.draw(this.ctx);
      }
    }
  };

  update() {
    let entitiesCount = this.entities.length;

    for (let i = 0; i < entitiesCount; i++) {
        let entity = this.entities[i];

        if (entity && !entity.removeFromWorld) {
            entity.update();
        }
    }

    for (let i = this.entities.length - 1; i >= 0; --i) {
        if (this.entities[i]?.removeFromWorld) {
            this.entities.splice(i, 1);
        }
    }
  };

  loop() {
    this.clockTick = this.timer.tick();
    this.update();
    this.draw();
  };

};

// KV Le was here :)
