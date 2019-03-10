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

    hasCollidedWithWalls(entity) {
        let aabb = entity.boundingBox;

        if (aabb) {
            let scale = entity.game.levelManager.level.tileDimension;
            let tx = Math.floor(aabb.left / scale);
            let ty = Math.floor(aabb.top / scale);
            let bx = Math.floor(aabb.right / scale);
            let by = Math.floor(aabb.bottom / scale);

            for (let y = ty; y < by; y++) {
                for (let x = tx; x <= bx; x++) {
                    if (this._isImpassable(x, y)) {
                        return true;
                    }
                }
            }
        }

        return false;

        // let targetX, targetY;
        // let j; // area to check collision
        //
        // for (j = 0; j < leafs.length; j++) {
        //     if (leafs[j].x <= characterX && characterX <= leafs[j].x + leafs[j].w
        //         && leafs[j].y <= characterY && characterY <= leafs[j].y + leafs[j].h) {
        //         break;
        //     }
        // }
        //
        // if (typeof leafs[j] === 'undefined') return true;
        //
        // for (let i = 0; i < leafs[j].walls.length; i++) {
        //     targetX = leafs[j].walls[i].x;
        //     targetY = leafs[j].walls[i].y;
        //     targetX = leafs[j].walls[i].x;
        //     targetY = leafs[j].walls[i].y;
        //
        //     if (characterX < targetX + world1.currentScale &&// - width for more percise when work with character
        //         characterX + world1.currentScale - width > targetX &&
        //         characterY < targetY + world1.currentScale &&
        //         characterY > targetY) {
        //         if (isCharacter && leafs[j].walls[i] instanceof Door == true && character.inventory.SilverKey > 0) {
        //             leafs[j].walls[i].removed = true;
        //             character.inventory.SilverKey -= 1;
        //             world1.slimeDungeonLevelOne[leafs[j].walls[i].position] = 24; // center floor.
        //             removeDoor(characterX, characterY, width); //destroy opened door
        //             return false;
        //         }
        //
        //         return true;
        //     }
        // }
    }

    isImpassable(id) {
        return false;
    }

    _isImpassable(column, row) {
        let index = row * this.tileDimension + column;
        if (index < 0 || index >= this.grid.length) return false;

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
            let element = this.templateQueue.splice(0, 1);
            if (element) this._populateGrid(element.column, element.row, element.template);
        }
    }

    _queueTemplate(column, row, template) {
        this.templateQueue.push({
            column: column,
            row: row,
            template: template
        })

        let columns = column + template[0].width - 1;
        let rows = row + template.length - 1;
        if (this.columns < columns) this.columns = columns;
        if (this.rows < rows) this.rows = rows;
    }

    _populateGrid(column, row, template) {
        for (let r = 0; r < template.length; r++) {
            for (let c = 0; c < template[r].length; r++) {
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

    _draw() {
        this._drawLevel();
        this._drawEntities();
    }

    _drawLevel() {
        let viewport = this.game.viewport;
        let screenSize = this.game.screenSize;

        let xMin = Math.floor(viewport.x / this.tileDimension);
        let xMax = Math.floor((viewport.x + screenSize.width) / this.tileDimension);
        let yMin = Math.floor(viewport.y / this.tileDimension);
        let yMax = Math.floor((viewport.y + screenSize.height) / this.tileDimension);

        this.game.ctx.save();
        for (let r = Math.max(yMin, 0); r <= Math.min(yMax, this.rows); r++) {
            for (let c = Math.max(xMin, 0); c <= Math.min(xMax, this.columns); c++) {
                let index = r * this.columns + c;
                if (index >= this.grid.length) break;

                let data = this.grid[index];

                if (data instanceof Array) {
                    for (let i in data) this._drawTile(c, r, data[i]);
                } else {
                    this._drawTile(c, r, data);
                }
            }
        }
        this.game.ctx.restore();
    }

    _drawTile(column, row, id) {
        if (id <= 0 || id > this.tiles.length) return;
        let sprite = this.tiles[id - 1];
        if (sprite) {
            this.game.ctx.drawImage(
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
    }

    _drawEntities() {
        let ctx = this.game.ctx;
        let viewport = this.game.viewport;
        let sx = viewport.sx;
        let sy = viewport.sy;
        let cw = ctx.canvas.width;
        let ch = ctx.canvas.height;
        // Calculate the x and y (top left) of a scaled window.
        let tx = viewport.x / sx;
        let ty = viewport.y / sy;

        ctx.clearRect(0, 0, cw, ch);
        ctx.save();
        ctx.resetTransform();
        // Scaling the context ahead of time can simulate zooming.
        ctx.scale(sx, sy);
        // We must translate the canvas to it's expected position.
        ctx.translate(-tx, -ty);
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(ctx);
        }

        if (this.game.debug) {
            // Calculates the width and height of a scaled window.
            let sw = cw / sx;
            let sh = ch / sy;
            // ctx.fillStyle = 'blue';
            // ctx.fillRect(tx, ty, sw / 2, sh / 2);
            ctx.strokeStyle = 'blue';
            ctx.beginPath();
            ctx.moveTo(tx, ty + sh / 2);
            ctx.lineTo(tx + sw, ty + sh / 2);
            ctx.moveTo(tx + sw / 2, ty);
            ctx.lineTo(tx + sw / 2, ty + sh);
            ctx.stroke();
        }
        ctx.restore();
    }
}

export default Level;