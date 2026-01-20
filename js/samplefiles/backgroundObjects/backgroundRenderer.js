export class BackgroundRenderer {
    draw(ctx, context) {
        ctx.save();
        ctx.fillStyle = "#32006e";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "white";
        ctx.font = "24px monospace";
        ctx.fillText("USE WASD TO MOVE AND OBSERVE THE DIFFERENT ANIMATIONS", 16, 32);
        ctx.restore();
    }
}
