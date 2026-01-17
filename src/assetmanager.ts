export default class AssetManager {
  successCount: number;
  errorCount: number;
  cache: Map<string, Blob>;
  downloadQueue: string[];

  constructor() {
    this.successCount = 0;
    this.errorCount = 0;
    this.cache = new Map();
    this.downloadQueue = [];
  };

  queueDownload(path: string) {
    console.log("Queueing " + path);
    this.downloadQueue.push(path);
  };

  isDone() {
    return this.downloadQueue.length === this.successCount + this.errorCount;
  }

  downloadAll(): Promise<void> {
    return new Promise(async (resolve) => {
      while(this.downloadQueue.length > 0) {
        const path = this.downloadQueue.pop();

        // Perform null/undefined check
        if (path === undefined || path === null) {
          continue;
        }

        try {
          const response = await fetch(path);
          if (!response.ok) {
            this.errorCount++;
            console.error(`Error ${response.status} on resource ${path}`);
          } else {
            const blob = await response.blob();
            console.log(blob); // debug
            this.successCount++;
            this.cache.set(path, blob);
          }
        } catch (error) {
          this.errorCount++;
          console.error(error);
        }
      }
      resolve();
    });
  }

  /**
   * Returns the asset blob, or a new, empty blob
   * if the asset isn't found.
   * @param path Path of the image
   * @returns A blob object
   */
  getAsset(path: string): Blob {
    const cacheData = this.cache.get(path);
    if (cacheData === undefined) {
      return new Blob();
    } else {
      return cacheData;
    }
  }
};