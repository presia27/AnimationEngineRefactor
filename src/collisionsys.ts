import { IEntity } from "./classinterfaces.ts";
import { AbstractCollisionHandler } from "./componentLibrary/AbstractCollisionHandler";
import { BoundingBox } from "./componentLibrary/boundingBox.ts";

interface CollisionPair {
  entityA: IEntity;
  entityB: IEntity;
  boundingBoxA: BoundingBox;
  boundingBoxB: BoundingBox;
}

export class CollisionSystem {
  private entities: IEntity[] = [];

  public addEntity(entity: IEntity): void {
    this.entities.push(entity);
  }

  public checkCollisions(): void {
    const collisionPairs: CollisionPair[] = [];

    for (let i = 0; i < this.entities.length; i++) {
      const entityA = this.entities[i];
      const boundsA = entityA?.getComponent(BoundingBox);
      if (!entityA || !boundsA) continue;

      for (let j = i + 1; j < this.entities.length; j++) {
        const entityB = this.entities[j];
        const boundsB = entityB?.getComponent(BoundingBox);
        if (!entityB || !boundsB) continue;

        if (boundsA.collide(boundsB)) {
          collisionPairs.push({
            entityA: entityA,
            entityB: entityB,
            boundingBoxA: boundsA,
            boundingBoxB: boundsB
          })
        }
      }
    }

    for (const collision of collisionPairs) {
      this.notifyCollisions(collision);
    }
  }

  private notifyCollisions(pair: CollisionPair): void {
    const handlerA = pair.entityA.getComponent(AbstractCollisionHandler);
    const handlerB = pair.entityB.getComponent(AbstractCollisionHandler);
    handlerA?.handleCollision(pair.entityB, pair.boundingBoxB);
    handlerB?.handleCollision(pair.entityA, pair.boundingBoxA);
  }
}