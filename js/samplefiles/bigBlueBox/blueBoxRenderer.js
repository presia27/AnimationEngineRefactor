export class BlueBoxRenderer {
    constructor(positionMgr, sizeMgr) {
        this.positionMgr = positionMgr;
        this.sizeMgr = sizeMgr;
    }
    draw(context) {
        const ctx = context.ctx;
        ctx.save();
        ctx.fillStyle = "#00bfff";
        ctx.fillRect(this.positionMgr.getPosition().x, this.positionMgr.getPosition().y, this.sizeMgr.getWidth(), this.sizeMgr.getHeight());
        ctx.restore();
    }
}
