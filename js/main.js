import AssetManager from "./assetmanager.js";
import GameEngine from "./gameengine.js";
import { catImageAssets } from "./assetlist.js";
const canvas = document.getElementById("gameWorld");
const ctx = canvas === null || canvas === void 0 ? void 0 : canvas.getContext("2d");
if (ctx === null || ctx === undefined) {
    throw new Error("Unable to get 2D canvas context");
}
const gameEngine = new GameEngine(ctx);
const ASSET_MANAGER = new AssetManager();
catImageAssets.forEach((img) => {
    ASSET_MANAGER.queueDownload(img);
});
ASSET_MANAGER.downloadAll().then(() => {
    catImageAssets.forEach((img) => {
        ASSET_MANAGER.getAsset(img);
    });
});
