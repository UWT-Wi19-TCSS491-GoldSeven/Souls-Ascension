let container = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
};

class Camera {
    constructor(game) {
        this.game = game;
        this._x = 0;
        this._y = 0;
        this.sx = 1.0;
        this.sy = 1.0;
        this._origin = {x: 0, y: 0};
    }

    get x() {
        return this._x;
    }

    set x(x) {
        this._x = x;
        this.left = x;
        this.right = this.left + this.width;
        this._origin.x = this.left + (this.width / 2);
    }

    get y() {
        return this._y;
    }

    set y(y) {
        this._y = y;
        this.top = y;
        this.bottom = this.top + this.height;
        this._origin.y = this.top + (this.height / 2);
    }

    get width() {
        return this.game.canvas.width / this.sx;
    }

    halfWidth() {
        return this.width / 2;
    }

    halfHeight() {
        return this.height / 2;
    }

    get height() {
        return this.game.canvas.height / this.sy;
    }

    get origin() {
        return this._origin;
    }

    setOrigin(x, y) {
        this.x = x - this.halfWidth();
        this.y = y - this.halfHeight();
    }

    xMid() {
        return this.left + this.halfWidth();
    }

    yMid() {
        return this.top + this.halfHeight();
    }

    isPointInView(x, y) {
        return this.left < x
            && this.right > x
            && this.top < y
            && this.bottom > y;
    }

    isBoundingBoxInView(other) {
        return this.right > other.length
            && this.left < other.right
            && this.top < other.bottom
            && this.bottom > other.top;
    }

    isAreaInView(x, y, width, height) {
        container.left = x;
        container.right = x + width;
        container.top = y;
        container.bottom = y + height;

        return this.isBoundingBoxInView(container)
    }
}

export default Camera;