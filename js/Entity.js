import BoundingBox from "./BoundingBox.js";

class Entity {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.destroyed = false;
        this.boundingBox = null;
    }

    update() {
        if (this.boundingBox) {
            this.boundingBox.setPos(this.x, this.y);
        }
    }

    draw(ctx) {
        if (this.game.debug) {
            if (this.boundingBox) {
                this.boundingBox.draw(ctx);
            }
        }
    }

    destroy() {
        this.destroyed = true;
    }
}

export default Entity;