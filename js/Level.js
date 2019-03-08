import Utils from './Utils.js';

class Level {
    constructor(game, levelManager, tileDimension) {
        this.game = game;
        this.levelManager = levelManager;
        this.tileDimension = tileDimension;
        this.reset();
    }

    reset() {
        this.tiles = new Array();
        this.templateQueue = new Array();
        this.columns = 0;
        this.rows = 0;
        this.grid = null;

        this.prePopulate();
        this.populateLevel();
        this.postPopulate();
    }

    prePopulate() {
    }

    postPopulate() {
    }

    appendTileSheet(tileSheet) {
        let tiles = Utils.sliceImage(tileSheet, this.tileDimension, this.tileDimension);
        for (let i in tiles) this.tiles.push(tiles[i])
    }

    populateLevel() {
        this.grid = new Array(this.rows * this.columns).fill(0);

        while (this.templateQueue.length > 0) {
            let element = this.templateQueue.splice(0, 1);
            if (element) this.populateGrid(element.column, element.row, element.template);
        }
    }

    queueTemplate(column, row, template) {
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

    populateGrid(column, row, template) {
        for (let r = 0; r < template.length; r++) {
            for (let c = 0; c < template[r].length; r++) {
                let data = template[r][c];
                if (data < 0) continue;
                this.populateCell(column + c, row + r, data);
            }
        }
    }

    populateCell(column, row, data) {
        let index = row * this.columns + column;

        if (data instanceof Array) {
            let copy = data.slice(0, data.length);
            for (let i = 0; i < copy.length; i++) {
                let id = copy[i];
                let result = this.populate(index, id) || false;
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

    populate(index, id) {
        return true;
    }

    update() {
    }

    draw() {
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

                if (this.grid[index] instanceof Array) {
                    for (let i in this.grid[index]) this.drawTile(c, r, this.grid[index][i]);
                } else {
                    this.drawTile(c, r, this.grid[index]);
                }
            }
        }
        this.game.ctx.restore();
    }

    drawTile(column, row, id) {
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
}

export default Level;