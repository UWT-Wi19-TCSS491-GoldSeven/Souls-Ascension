class Entity {
    constructor(game, x, y) {
        this.game = game;
        this._x = x;
        this._y = y;
        this.destroyed = false;
        this._boundingBox = null;
        this.xMot = 0;
        this.yMot = 0;
        this.direction = 'down';
    }

    update() {
        this.xMot = 0;
        this.yMot = 0;
    }

    draw(ctx) {
        if (this.game.debug.enabled) {
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

    updatePosition(aabb = this.boundingBox) {
        if (!aabb) return;

        let result = this.game.level.hasCollidedWithWalls(aabb, this.xMot, this.yMot);

        if (result) {
            if (!(result.left || result.right)) this.x += this.xMot;
            else this.xMot = 0;
            if (!(result.top || result.bottom)) this.y += this.yMot;
            else this.yMot = 0;
        }

        if (this.yMot < 0) this.direction = 'up';
        else if (this.yMot > 0) this.direction = 'down';
        else if (this.xMot < 0) this.direction = 'left';
        else if (this.xMot > 0) this.direction = 'right';
    }
}

export default Entity;