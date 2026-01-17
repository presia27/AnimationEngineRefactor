
export class Animator {
  spritesheet: HTMLImageElement;
  xStart: number;
  yStart: number;
  width: number;
  height: number;
  frameCount: number;
  frameDuration: number;
  framePadding: number;
  reverse: boolean;
  loop: boolean;
  flipflop: boolean;

  elapsedTime: number;  // keep track of how much time it's been since the last animation
  totalTime: number;    // calculation of total time of the animation

  /**
   * 
   * @param {HTMLImageElement} spritesheet Spritesheet image
   * @param {number} xStart starting X coordinate of the first frame
   * @param {number} yStart starting Y coordinate of the first frame
   * @param {number} width width of the frame
   * @param {number} height height of the frame
   * @param {number} frameCount number of frames that make up the animation
   * @param {number} frameDuration how long each frame should be painted on the canvas
   * @param {number} framePadding amount of empty padding between each frame
   * @param {boolean} reverse flag to reverse the order in which frames are drawn
   * @param {boolean} loop specify if the animation is a looping animation
   * @param {boolean} flipflop runs in alternating reverse and forward order
   */
  constructor(spritesheet: HTMLImageElement, xStart: number, yStart: number, width: number, height: number, frameCount: number, frameDuration: number, framePadding: number, reverse: boolean, loop: boolean, flipflop: boolean) {
    this.spritesheet = spritesheet;
    this.xStart = xStart;
    this.yStart = yStart;
    this.width = width;
    this.height = height;
    this.frameCount = frameCount;
    this.frameDuration = frameDuration;
    this.framePadding = framePadding;
    this.reverse = reverse;
    this.loop = loop;
    this.flipflop = flipflop;

    this.elapsedTime = 0;
    this.totalTime = this.frameCount * this.frameDuration;
  }

  drawFrame(tick: number, ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) {
    this.elapsedTime += tick;

    if (this.isDone()) {
      if (this.loop) {
        this.elapsedTime -= this.totalTime; // go back to the beginning if looping
        if (this.flipflop) { // if flipflopping is enabled, set to reverse order
          this.reverse = !this.reverse;
        }
      }
    }

    let frame = this.currentFrame();

    if (this.reverse) {
      frame = this.frameCount - frame - 1;
    }

    ctx.drawImage(this.spritesheet,
      this.xStart + frame * (this.width + this.framePadding), this.yStart, // source from sheet
      this.width, this.height,
      x, y,
      this.width * scale,
      this.height * scale
    );
  }

  drawFrameWithBoundingBox(tick: number, ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) {
    ctx.save();
    ctx.strokeStyle = "red";
    ctx.strokeRect(x, y, this.width * scale, this.height * scale);
    ctx.restore();
    this.drawFrame(tick, ctx, x, y, scale);
  }

  currentFrame() {
    return Math.floor(this.elapsedTime / this.frameDuration);
  }

  isDone(): boolean {
    return (this.elapsedTime >= this.totalTime);
  }
}