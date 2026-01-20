import { IEntity } from "../../classinterfaces.ts";
import { Entity } from "../../entity.ts";

import { BackgroundRenderer } from "./backgroundRenderer.ts";

export function buildBackground(): IEntity {
  const backgroundEntity = new Entity();
  const backgroundRender = new BackgroundRenderer();
  backgroundEntity.setRenderer(backgroundRender);

  return backgroundEntity;
}
