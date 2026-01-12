export default class AssetManager {
  successCount: number;
  errorCount: number;
  cache: Map<string, any>;
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

  getAsset(path: string) {
    return this.cache.get(path);
  }
};