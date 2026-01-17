var _a;
import AssetManager from "../assetmanager.js";
import GameEngine from "../gameengine.js";
import { catImageAssets } from "./assetlist.js";
import { myInputMap } from "./inputmap.js";
import { Cat } from "./catEntity.js";
const canvas = document.getElementById("gameWorld");
const ctx = canvas === null || canvas === void 0 ? void 0 : canvas.getContext("2d");
if (ctx === null || ctx === undefined) {
    throw new Error("Unable to get 2D canvas context");
}
;
const gameEngine = new GameEngine(ctx, myInputMap);
const ASSET_MANAGER = new AssetManager();
catImageAssets.filter((asset) => asset.type === "spritesheet")
    .forEach((img) => {
    ASSET_MANAGER.queueDownload(img.location);
});
ASSET_MANAGER.downloadAll().then(() => {
    // catImageAssets.forEach((img) => {
    //   ASSET_MANAGER.getAsset(img);
    // });
    gameEngine.addEntity(new Cat(ASSET_MANAGER, gameEngine.getGameContext, gameEngine.getInputSystem, { x: 64, y: 64 }));
    gameEngine.start();
});
(_a = document.getElementById("btnDebug")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    gameEngine.toggleDebugging();
});
