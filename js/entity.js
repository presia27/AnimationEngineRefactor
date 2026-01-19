export class Entity {
    constructor() {
        this.components = [];
        this.renderer = null;
        this.gameContext = null;
    }
    addComponent(component) {
        this.components.push(component);
    }
    setRenderer(renderer) {
        this.renderer = renderer;
    }
    update(context) {
        this.gameContext = context; // update context field for draw method
        for (const component of this.components) {
            component.update(context);
        }
    }
    draw(ctx) {
        if (this.renderer !== null && this.gameContext !== null) {
            this.renderer.draw(ctx, this.gameContext);
        }
    }
    // Originally had components: any, changed to
    // TypeScript generic with Claude's help
    getComponent(component) {
        return this.components.find(c => c instanceof component);
    }
}
