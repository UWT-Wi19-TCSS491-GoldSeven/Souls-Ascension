import BoundingBox from './BoundingBox.js';

class Entity {
    constructor(game, x, y) {
        this.game = game;
        this._x = x;
        this._y = y;
        this.destroyed = false;
        this._boundingBox = null;
    }

    update() {
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

    set boundingBox(boundingBox) {
        this._boundingBox = boundingBox;
        this._boundingBox.setPos(this._x, this._y);
    }

    get boundingBox() {
        return this._boundingBox;
    }

    set x(value) {
        this._x = value;
        if (this.boundingBox) this.boundingBox.x = value;
    }

    get x() {
        return this._x;
    }

    set y(value) {
        this._y = value;
        if (this.boundingBox) this.boundingBox.y = value;
    }

    get y() {
        return this._y;
    }
}

export default Entity;