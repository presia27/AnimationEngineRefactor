export class BlueBoxRenderer {
    constructor(positionMgr, sizeMgr, color) {
        this.positionMgr = positionMgr;
        this.sizeMgr = sizeMgr;
        this.color = color;
    }
    draw(context) {
        const ctx = context.ctx;
        ctx.save();
        ctx.fillStyle = this.color.getColor();
        ctx.fillRect(this.positionMgr.getPosition().x, this.positionMgr.getPosition().y, this.sizeMgr.getWidth(), this.sizeMgr.getHeight());
        ctx.restore();
    }
}
