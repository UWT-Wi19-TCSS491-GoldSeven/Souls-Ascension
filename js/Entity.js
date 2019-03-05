class Entity {
    constructor(game, x, y, genAABB = true) {
        this.x = x;
        this.y = y;
        this.isDestroyed = false;
        if (genAABB) this.boundingBox = new BoundingBox(this.x, this.y, 99, 99); // 99 is default width and height.
    }

    update() {
    }

    draw() {
    }

    destroy() {
        this.isDestroyed = true;
    }
}
