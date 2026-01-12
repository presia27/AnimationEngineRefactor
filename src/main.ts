import AssetManager from "./assetmanager.ts";
import { catImageAssets } from "./assetlist.ts";

const ASSET_MANAGER = new AssetManager();

catImageAssets.forEach((img) => {
  ASSET_MANAGER.queueDownload(img);
})

ASSET_MANAGER.downloadAll().then(() => {
  catImageAssets.forEach((img) => {
    ASSET_MANAGER.getAsset(img);
  })
})
