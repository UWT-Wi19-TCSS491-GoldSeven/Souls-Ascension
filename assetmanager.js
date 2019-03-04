function AssetManager() {
    this.successCount = 0;
    this.errorCount = 0;
    this.cache = {};
    this.downloadQueue = {};
}

AssetManager.prototype.queueDownload = function (key, path = key) {
    // console.log("Queueing " + path);
    this.downloadQueue[key] = path;
}

AssetManager.prototype.isDone = function () {
    let length = 0;
    for (let prop in this.downloadQueue) length += 1;

    return length === this.successCount + this.errorCount;
}

AssetManager.prototype.downloadAll = function (callback) {
    var that = this;

    for (let property in this.downloadQueue) {
        let img = new Image();

        img.addEventListener("load", function () {
            // console.log("Loaded " + this.src);
            that.successCount++;
            if(that.isDone()) callback();
        });

        img.addEventListener("error", function () {
            console.log("Error loading " + this.src);
            that.errorCount++;
            if (that.isDone()) callback();
        });

        img.src = this.downloadQueue[property];
        this.cache[property] = img;
    }

    if (this.isDone()) callback();
}

AssetManager.prototype.getAsset = function (path) {
    return this.cache[path];
}