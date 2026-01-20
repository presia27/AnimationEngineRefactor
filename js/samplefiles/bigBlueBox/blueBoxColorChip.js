export class BlueBoxColor {
    constructor(defaultColor) {
        this.defaultColor = defaultColor;
        this.color = defaultColor;
    }
    update(context) {
        return;
    }
    getColor() {
        return this.color;
    }
    setColor(color) {
        this.color = color;
    }
    resetColor() {
        this.color = this.defaultColor;
    }
}
