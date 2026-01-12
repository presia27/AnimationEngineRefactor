import AssetManager from "./assetmanager.js";
import { catImageAssets } from "./assetlist.js";
const ASSET_MANAGER = new AssetManager();
catImageAssets.forEach((img) => {
    ASSET_MANAGER.queueDownload(img);
});
ASSET_MANAGER.downloadAll().then(() => {
    catImageAssets.forEach((img) => {
        ASSET_MANAGER.getAsset(img);
    });
});
