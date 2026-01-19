class Entity {
    constructor() {
        this.components = [];
        this.renderer = null;
    }
    addComponent(component) {
        this.components.push(component);
    }
    setRenderer(renderer) {
        this.renderer = renderer;
    }
    update(context) {
        for (const component of this.components) {
            component.update(context);
        }
    }
    draw(ctx) {
        if (this.renderer !== null) {
            this.renderer.draw(ctx);
        }
    }
}
export {};
