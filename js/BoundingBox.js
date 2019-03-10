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
        this._x;
        this._y;
        this._width = width;
        this._height = height;
        this.left = theX + xOffset;
        this.top = theY + yOffset;
        this.right = this.left + width;
        this.bottom = this.top + height;
        /**
         * The center of the entity.
         */
        this._origin = {x: this.left + this.width / 2, y: this.top + this.height / 2};
    }

    set x(value) {
        this._x = value + this._xOffset;
        this._origin.x = this._x - (this.width / 2);
    }

    get x() {
        return this._x
    }

    set y(value) {
        this._y = value + this._yOffset;
        this._origin.y = this._y - (this.height / 2);
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
        this.left = x + this._xOffset;
        this.top = y + this._yOffset;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
        this.origin.x = this.left + this.width / 2;
        this.origin.y = this.top + this.height / 2;
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