import AssetManager from "./assetmanager";

const ASSET_MANAGER = new AssetManager();

const CAT_SPRITE_LOCATION = "../../assets/CatSpriteFromPinterest.png";

ASSET_MANAGER.queueDownload(CAT_SPRITE_LOCATION);

ASSET_MANAGER.downloadAll().then(() => {
  console.log(ASSET_MANAGER.getAsset(CAT_SPRITE_LOCATION));
})
