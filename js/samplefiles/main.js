var _a;
import AssetManager from "../assetmanager.js";
import GameEngine from "../gameengine.js";
import { catImageAssets } from "./assetlist.js";
import { myInputMap } from "./inputmap.js";
import { buildCat } from "./catAsset/catEntityBuilder.js";
import { buildBackground } from "./backgroundObjects/backgroundEntityBuilder.js";
import { buildBigBlueBox } from "./bigBlueBox/blueBoxEntityBuilder.js";
const canvas = document.getElementById("gameWorld");
const ctx = canvas === null || canvas === void 0 ? void 0 : canvas.getContext("2d");
if (ctx === null || ctx === undefined) {
    throw new Error("Unable to get 2D canvas context");
}
;
const gameEngine = new GameEngine(ctx, myInputMap);
const ASSET_MANAGER = new AssetManager();
catImageAssets.filter((asset) => asset.type === "img")
    .forEach((img) => {
    ASSET_MANAGER.queueDownload(img.id, img.type, img.location);
});
ASSET_MANAGER.downloadAll().then(() => {
    // Create new instances of entities and add them to the game engine and collision system
    const cat = buildCat(ASSET_MANAGER, gameEngine.getInputSystem(), ctx, { x: 64, y: 64 });
    const blueBox = buildBigBlueBox({ x: 256, y: 256 });
    const blueBox2 = buildBigBlueBox({ x: 512, y: 512 });
    gameEngine.addEntity(cat);
    gameEngine.getCollisionSystem().addEntity(cat);
    gameEngine.addEntity(blueBox);
    gameEngine.getCollisionSystem().addEntity(blueBox);
    gameEngine.addEntity(blueBox2);
    gameEngine.getCollisionSystem().addEntity(blueBox2);
    gameEngine.addEntity(buildBackground());
    gameEngine.start();
});
(_a = document.getElementById("btnDebug")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    gameEngine.toggleDebugging();
});
