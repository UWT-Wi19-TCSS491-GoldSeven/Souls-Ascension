import Utils from './Utils.js';

class Level {
    // Optional game parameter can be provided if access to the game object is needed during setup.
    constructor(game, tileDimension) {
        this.game = game;
        this.entities = [];
        this.taggedEntities = new Map();
        this.tileDimension = tileDimension;
        this.tiles = [];
        this.templateQueue = [];
        this.columns = 0;
        this.rows = 0;
        this.grid = null;
    }

    init() {
    }

    setup() {
        this.prePopulate();
        this._populateLevel();
        this.postPopulate();
    }

    tearDown() {
        this.templateQueue.length = 0;
        this.entities.length = 0;
        this.taggedEntities.clear();
    }

    prePopulate() {
    }

    postPopulate() {
    }

    getContents(x, y) {
        let col = Math.floor(x / this.tileDimension);
        let row = Math.floor(y / this.tileDimension);
        return this.getCellContents(col, row);
    }

    getCellContents(column, row) {
        let index = row * this.tileDimension + column;
        if (index < 0 || index >= this.grid.length) return null;
        return this.grid[index];
    }

    populateCell(index, id) {
        return true;
    }

    addEntity(entity, tag = null) {
        entity.game = this.game;
        this.entities.push(entity);
        if (tag) this.taggedEntities.set(tag, entity);
    }

    getEntityWithTag(tag) {
        return this.taggedEntities.get(tag);
    }

    appendTileSheet(tileSheet) {
        let tiles = Utils.sliceImage(tileSheet, this.tileDimension, this.tileDimension);
        for (let i in tiles) this.tiles.push(tiles[i])
    }

    hasCollidedWithWalls(aabb, xMot, yMot) {
        let result = null;

        if (aabb) {
            let el = Math.floor(aabb.left / this.tileDimension);
            let er = Math.floor(aabb.right / this.tileDimension);
            let et = Math.floor(aabb.top / this.tileDimension);
            let eb = Math.floor(aabb.bottom / this.tileDimension);

            result = {
                left: false,
                right: false,
                top: false,
                bottom: false
            }

            if (yMot != 0) {
                let y = yMot < 0 ? aabb.top + yMot : aabb.bottom + yMot
                let yIndex = Math.floor(y / this.tileDimension);

                for (let x = el; x <= er; x++) {
                    if (this.isCellImpassable(x, yIndex)) {
                        if (yMot < 0) {
                            result.top = true;
                        } else {
                            result.bottom = true;
                        }
                    }
                }
            }

            if (xMot != 0) {
                let x = xMot < 0 ? aabb.left + xMot : aabb.right + xMot;
                let xIndex = Math.floor(x / this.tileDimension);

                for (let y = et; y <= eb; y++) {
                    if (this.isCellImpassable(xIndex, y)) {
                        if (xMot < 0) {
                            result.left = true;
                        } else {
                            result.right = true;
                        }
                    }
                }
            }
        }

        return result;
    }

    isCellImpassable(x, y) {
        let index = y * this.columns + x;
        if (index < 0 || index >= this.grid.length) return true;
        return this._isCellImpassable(this.grid[index]);
    }

    _isCellImpassable(data) {
        if (data instanceof Array) {
            for (let i in data) {
                if (this._isImpassable(data[i])) return true;
            }
        } else {
            return this.isImpassable(data);
        }

        return false;
    }

    isImpassable(id) {
        return false;
    }

    _isImpassable(column, row) {
        let index = row * this.columns + column;
        if (index < 0 || index >= this.grid.length) return true;

        let data = this.grid[index];
        if (data instanceof Array) {
            for (let i in data) {
                if (this.isImpassable(data[i])) return true;
            }
        } else {
            return this.isImpassable(data);
        }

        return false;
    }

    _populateLevel() {
        this.grid = new Array(this.rows * this.columns).fill(0);

        while (this.templateQueue.length > 0) {
            let element = this.templateQueue.splice(0, 1)[0];
            if (element) this._populateTemplate(element.column, element.row, element.template);
        }
    }

    queueTemplate(column, row, template) {
        this.templateQueue.push({
            column: column,
            row: row,
            template: template
        })

        let columns = column + template[0].length;
        let rows = row + template.length;
        if (this.columns < columns) this.columns = columns;
        if (this.rows < rows) this.rows = rows;
    }

    _populateTemplate(column, row, template) {
        for (let r = 0; r < template.length; r++) {
            for (let c = 0; c < template[r].length; c++) {
                let data = template[r][c];
                if (data < 0) continue;
                this._populateCell(column + c, row + r, data);
            }
        }
    }

    _populateCell(column, row, data) {
        let index = row * this.columns + column;

        if (data instanceof Array) {
            let copy = data.slice(0, data.length);
            for (let i = 0; i < copy.length; i++) {
                let id = copy[i];
                let result = this.populateCell(index, id) || false;
                if (typeof result !== 'boolean' || !result) {
                    copy.splice(i, 1);
                    i -= 1;
                }
            }

            if (copy.length > 1) this.grid[index] = copy;
            else if (copy.length == 1) this.grid[index] = copy[0];
        } else {
            this.grid[index] = data;
        }
    }

    _update() {
        let entitiesCount = this.entities.length;

        for (let i = 0; i < entitiesCount; i++) {
            let entity = this.entities[i];

            if (!entity.update)
                continue;

            if (!entity.destroyed) {
                entity.update();
            }
        }

        for (let i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].destroyed) {
                this.entities.splice(i, 1);
            }
        }
    }

    _draw(ctx) {
        let viewport = this.game.viewport;
        let sx = viewport.sx;
        let sy = viewport.sy;
        let cw = ctx.canvas.width;
        let ch = ctx.canvas.height;
        // Calculate the x and y (top left) of a scaled window.
        let tx = viewport.x / sx;
        let ty = viewport.y / sy;

        ctx.resetTransform();
        ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        // Scaling the context ahead of time can simulate zooming.
        ctx.scale(sx, sy);
        // We must translate the canvas to it's expected position.
        ctx.translate(-tx, -ty);

        this._drawLevel(ctx);
        this._drawEntities(ctx);

        if (this.game.debug.enabled) {
            ctx.save();
            ctx.resetTransform();
            ctx.font = '16px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'right';
            ctx.textBaseline = 'top';
            ctx.fillText(`Debug Level: ${this.game.debug.verbosity}`, this.game.canvas.width, 0);
            ctx.restore();

            if (this.game.debug.verbosity > 2) {
                ctx.save();
                // Calculates the width and height of a scaled window.
                let sw = cw / sx;
                let sh = ch / sy;
                ctx.strokeStyle = 'blue';
                ctx.beginPath();
                ctx.moveTo(tx, ty + sh / 2);
                ctx.lineTo(tx + sw, ty + sh / 2);
                ctx.moveTo(tx + sw / 2, ty);
                ctx.lineTo(tx + sw / 2, ty + sh);
                ctx.stroke();
                ctx.restore();
            }
        }

        ctx.save();
        this.drawUserInterface(ctx);
        ctx.restore();
    }

    _drawLevel(ctx) {
        let viewport = this.game.viewport;
        let screenSize = this.game.screenSize;

        let xMin = Math.floor(viewport.x / this.tileDimension);
        let xMax = Math.floor((viewport.x + screenSize.width) / this.tileDimension);
        let yMin = Math.floor(viewport.y / this.tileDimension);
        let yMax = Math.floor((viewport.y + screenSize.height) / this.tileDimension);

        this.game.ctx.save();
        for (let r = Math.max(yMin, 0); r <= Math.min(yMax, this.rows - 1); r++) {
            for (let c = Math.max(xMin, 0); c <= Math.min(xMax, this.columns - 1); c++) {
                let index = r * this.columns + c;
                if (index >= this.grid.length) break;

                let data = this.grid[index];

                if (data instanceof Array) {
                    for (let i in data) this._drawTile(ctx, c, r, data[i]);
                } else {
                    this._drawTile(ctx, c, r, data);
                }
            }
        }
        this.game.ctx.restore();
    }

    _drawTile(ctx, column, row, id) {
        if (id <= 0 || id > this.tiles.length) return;
        let sprite = this.tiles[id - 1];
        if (sprite) {
            ctx.drawImage(
                sprite,
                0,
                0,
                this.tileDimension,
                this.tileDimension,
                column * this.tileDimension,
                row * this.tileDimension,
                this.tileDimension,
                this.tileDimension
            );
        }

        if (this.game.debug.enabled) {
            ctx.strokeStyle = 'green';
            ctx.moveTo(column * this.tileDimension, row * this.tileDimension);
            ctx.lineTo(column * this.tileDimension + this.tileDimension, row * this.tileDimension);
            ctx.lineTo(column * this.tileDimension + this.tileDimension, row * this.tileDimension + this.tileDimension);
            ctx.lineTo(column * this.tileDimension, row * this.tileDimension + this.tileDimension);
            ctx.stroke();

            if (this.game.debug.verbosity > 3) {
                ctx.font = '15px Arial';
                ctx.fillStyle = 'tan';
                ctx.textAlign = 'center';
                ctx.fillText(`${column},${row}`, column * this.tileDimension + (this.tileDimension / 2), row * this.tileDimension + (this.tileDimension / 2));
            }
        }
    }

    _drawEntities(ctx) {
        this.entities.sort(this.compareDepth);

        for (let i = 0; i < this.entities.length; i++) {
            ctx.save();
            this.entities[i].draw(ctx);
            ctx.restore();
        }
    }

    drawUserInterface(ctx) {
    }

    compareDepth(a, b) {
        if (a.boundingBox && b.boundingBox) {
            if (a.boundingBox.bottom < b.boundingBox.bottom)
                return -1;
            if (b.boundingBox.bottom > a.boundingBox.bottom)
                return 1;
        }

        return 0;
    }
}

export default Level;