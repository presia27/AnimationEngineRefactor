import { Entity } from "../../entity.js";
import { BackgroundRenderer } from "./backgroundRenderer.js";
export function buildBackground() {
    const backgroundEntity = new Entity();
    const backgroundRender = new BackgroundRenderer();
    backgroundEntity.setRenderer(backgroundRender);
    return backgroundEntity;
}
