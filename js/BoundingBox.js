/**
 * A bounding box for an entity for collision detection. The imaginary box around the entity.
 * @param {*} theX
 * @param {*} theY
 * @param {*} width
 * @param {*} height
 * @param {*} xOffset
 * @param {*} yOffset
 */
function BoundingBox(theX, theY, width, height, xOffset, yOffset) {
    this._xOffset = xOffset || 0;
    this._yOffset = yOffset || 0;
    this._x;
    this._y;
    this._width = width;
    this._height = height;
    this.left = theX;
    this.top = theY;
    this.right = this.left + width;
    this.bottom = this.top + height;
    /**
     * The center of the entity.
     */
    this._origin = { x: this.left + this.width / 2, y: this.top + this.height / 2 };
}

BoundingBox.prototype = {
    set x(value) {
        this._x = value + this._xOffset;
        this._origin.x = this._x - (this.width / 2);
    },
    get x() { return this._x },
    set y(value) {
        this._y = value + this._yOffset;
        this._origin.y = this._y - (this.height / 2);
    },
    get y() { return this._y },
    get origin() { return this._origin },
    set offsetX(value) { this._xOffset = value },
    set offsetY(value) { this._yOffset = value },
    set width(value) { this._width = value },
    get width() { return this._width },
    set height(value) { this._height = value },
    get height() { return this._height },
}

BoundingBox.prototype.collide = function (oth) {
    if (this.right > oth.left
        && this.left < oth.right
        && this.top < oth.bottom
        && this.bottom > oth.top)
        return true;
    return false;
}

BoundingBox.prototype.setPos = function (x, y) {
    this.left = x;
    this.top = y;
    this.right = this.left + this.width;
    this.bottom = this.top + this.height
    this.origin.x = this.left + this.width / 2;
    this.origin.y = this.top + this.height / 2;
}
