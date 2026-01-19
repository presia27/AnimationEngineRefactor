import AssetManager from "../assetmanager.ts";
import GameEngine from "../gameengine.ts";
import { catImageAssets } from "./assetlist.ts";
import { myInputMap } from "./inputmap.ts";
//import { Cat } from "./catEntity.ts";
import { buildCat } from "./catAsset/catEntityBuilder.ts";

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
  // catImageAssets.forEach((img) => {
  //   ASSET_MANAGER.getAsset(img);
  // });
  //gameEngine.addEntity(new Cat(ASSET_MANAGER, gameEngine.getGameContext(), gameEngine.getInputSystem(), {x: 64, y: 64}))

  gameEngine.addEntity(buildCat(ASSET_MANAGER, gameEngine.getInputSystem(), {x: 64, y: 64}))

  gameEngine.start();
});

document.getElementById("btnDebug")?.addEventListener("click", () => {
  gameEngine.toggleDebugging();
})
