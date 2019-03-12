import LivingEntity from './LivingEntity.js';

class HostileEntity extends LivingEntity {
    constructor(game, x, y) {
        super(game, x, y);
        this.origin = {
            x: null,
            y: null
        };
        this.destination = {
            x: null,
            y: null
        };
        this.visited = [];
    }

    checkSight(aabbB, accuracy = 100) {
        let aabbA = this.boundingBox;
        if (aabbA == null || aabbB == null) return;

        let level = this.game.level;

        let start = aabbA.origin.x < aabbB.origin.x ? aabbA : aabbB;
        let end = aabbA.origin.x < aabbB.origin.x ? aabbB : aabbA;

        let incX = (end.origin.x - start.origin.x) / accuracy;
        let incY = (end.origin.y - start.origin.y) / accuracy;

        this.origin.x = level.toColumn(aabbA.origin.x);
        this.origin.y = level.toRow(aabbA.origin.y);

        this.destination.x = level.toColumn(aabbB.origin.x);
        this.destination.y = level.toRow(aabbB.origin.y);

        this.destination

        let lastX = start.x, lastY = start. y;
        for (let i = 1; i < accuracy; i++) {
            let col = level.toColumn(start.x + (incX * i));
            let row = level.toRow(start.y + (incY * i));

            if ((col == this.origin.x && row == this.origin.y)
                || (col == this.destination.x && row == this.destination.y))
                continue;

            if (lastX != col || lastY != row) {
                lastX = col;
                lastY = row;

                this.visited.push({
                    x: col,
                    y: row
                });
            }

            if (level._isImpassable(col, row)) {
                return false;
            }
        }

        return true;
    }

    draw(ctx) {
        super.draw(ctx);

        if (this.game.debug.enabled && this.game.debug.verbosity > 2 && this.visited.length > 0) {
            let scale = this.game.level.tileDimension;

            for (let i in this.visited) {
                let tile = this.visited[i];
                ctx.fillStyle = 'rgba(0, 255, 0, 0.2)';
                ctx.fillRect(this.origin.x * scale, this.origin.y * scale,
                    scale, scale);
                ctx.fillStyle = 'rgba(0, 0, 255, 0.2)';
                ctx.fillRect(tile.x * scale, tile.y * scale,
                    scale, scale);
                ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
                ctx.fillRect(this.destination.x * scale, this.destination.y * scale,
                    scale, scale);
            }

            this.visited.length = 0;
        }

        this.drawHPBar(ctx);
    }

    drawHPBar(ctx) {
        ctx.fillStyle = 'red'
        ctx.fillRect(this.x + 15, this.y, 50 * this.health / this.maxHealth, 3);
        ctx.strokeStyle = 'black'
        ctx.strokeRect(this.x + 15, this.y, 50, 3);
    }
}

export default HostileEntity;