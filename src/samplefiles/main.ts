import AssetManager from "../assetmanager.ts";
import GameEngine from "../gameengine.ts";
import { catImageAssets } from "./assetlist.ts";
import { myInputMap } from "./inputmap.ts";
import { buildCat } from "./catAsset/catEntityBuilder.ts";
import { buildBackground } from "./backgroundObjects/backgroundEntityBuilder.ts";
import { buildBigBlueBox } from "./bigBlueBox/blueBoxEntityBuilder.ts";

const canvas: HTMLCanvasElement = document.getElementById("gameWorld") as HTMLCanvasElement;
const ctx = canvas?.getContext("2d");

if (ctx === null || ctx === undefined) {
  throw new Error("Unable to get 2D canvas context");
};

const gameEngine = new GameEngine(ctx, myInputMap);
const ASSET_MANAGER = new AssetManager();

catImageAssets.filter((asset) => asset.type === "img")
  .forEach((img) => {
    ASSET_MANAGER.queueDownload(img.id, img.type, img.location);
  });

ASSET_MANAGER.downloadAll().then(() => {
  // Create new instances of entities and add them to the game engine and collision system
  const cat = buildCat(ASSET_MANAGER, gameEngine.getInputSystem(), ctx, {x: 64, y: 64});
  const blueBox = buildBigBlueBox({x: 256, y: 256});
  const blueBox2 = buildBigBlueBox({x: 512, y: 512});

  gameEngine.addEntity(cat);
  gameEngine.getCollisionSystem().addEntity(cat);
  gameEngine.addEntity(blueBox);
  gameEngine.getCollisionSystem().addEntity(blueBox);
  gameEngine.addEntity(blueBox2);
  gameEngine.getCollisionSystem().addEntity(blueBox2);

  gameEngine.addEntity(buildBackground());

  gameEngine.start();
});

document.getElementById("btnDebug")?.addEventListener("click", () => {
  gameEngine.toggleDebugging();
})
