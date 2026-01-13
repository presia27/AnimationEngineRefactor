import AssetManager from "./assetmanager.ts";
import GameEngine from "./gameengine.ts";
import { catImageAssets } from "./assetlist.ts";

const canvas: HTMLCanvasElement = document.getElementById("gameWorld") as HTMLCanvasElement;
const ctx = canvas?.getContext("2d");

if (ctx === null || ctx === undefined) {
  throw new Error("Unable to get 2D canvas context");
}

const gameEngine = new GameEngine(ctx);
const ASSET_MANAGER = new AssetManager();

catImageAssets.forEach((img) => {
  ASSET_MANAGER.queueDownload(img);
})

ASSET_MANAGER.downloadAll().then(() => {
  catImageAssets.forEach((img) => {
    ASSET_MANAGER.getAsset(img);
  })
})
