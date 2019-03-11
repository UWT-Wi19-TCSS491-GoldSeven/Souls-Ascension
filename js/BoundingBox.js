/**
 * A bounding box for an entity for collision detection. The imaginary box around the entity.
 * @param {*} theX
 * @param {*} theY
 * @param {*} width
 * @param {*} height
 * @param {*} xOffset
 * @param {*} yOffset
 */
class BoundingBox {
    constructor(theX, theY, width, height, xOffset = 0, yOffset = 0) {
        this._xOffset = xOffset || 0;
        this._yOffset = yOffset || 0;
        this._width = width;
        this._height = height;
        this._x = 0;
        this._y = 0;
        this._origin = {x: 0, y: 0}
        this.x = theX;
        this.y = theY;
    }

    set x(value) {
        this._x = value + this._xOffset;
        this.left = this._x + this._xOffset;
        this.right = this.left + this.width;
        this._origin.x = this.right - (this.width / 2);
    }

    get x() {
        return this._x
    }

    set y(value) {
        this._y = value + this._yOffset;
        this.top = this._y + this._yOffset;
        this.bottom = this.top + this.height;
        this._origin.y = this.bottom - (this.height / 2);
    }

    get y() {
        return this._y
    }

    get origin() {
        return this._origin
    }

    set offsetX(value) {
        this._xOffset = value
    }

    set offsetY(value) {
        this._yOffset = value
    }

    set width(value) {
        this._width = value
    }

    get width() {
        return this._width
    }

    set height(value) {
        this._height = value
    }

    get height() {
        return this._height
    }

    hasCollided(other) {
        if (this.right > other.left
            && this.left < other.right
            && this.top < other.bottom
            && this.bottom > other.top)
            return true;
        return false;
    }

    setPos(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(ctx, style = 'green') {
        ctx.save();
        ctx.strokeStyle = style;
        ctx.beginPath();
        ctx.moveTo(this.left, this.top);
        ctx.lineTo(this.right, this.top);
        ctx.lineTo(this.right, this.bottom);
        ctx.lineTo(this.left, this.bottom);
        ctx.lineTo(this.left, this.top);
        ctx.stroke();
        ctx.restore();
    }
}

export default BoundingBox;