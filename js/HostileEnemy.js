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

    checkSight(aabbB) {
        let aabbA = this.boundingBox;
        if (aabbA == null || aabbA == undefined) return;

        let level = this.game.levelManager.level;

        let start = aabbA.origin.x < aabbB.origin.x ? aabbA : aabbB;
        let end = aabbA.origin.x < aabbB.origin.x ? aabbB : aabbA;

        let scale = this.game.levelManager.level.tileDimension;

        // Starting tile x and y tile indices
        let six = Math.floor(start.origin.x / scale),
            siy = Math.floor((start.origin.y + (start.height / 2)) / scale);
        // Ending tile x and y indices
        let eix = Math.floor(end.origin.x / scale),
            eiy = Math.floor((end.origin.y + (start.height / 2)) / scale);

        this.origin.x = six;
        this.origin.y = siy;

        this.destination.x = eix;
        this.destination.y = eiy;

        if (six == eix) {
            // Organize tile y indices
            if (siy < eiy) {
                siy += 1;
            } else {
                let tmp = siy;
                siy = eiy;
                eiy = tmp - 1;
            }

            // All tiles are in one column. Skip the starting tile.
            for (let cy = siy; cy <= eiy; cy++) {
                if (this.game.debug.enabled) this.visited.push({
                    x: six,
                    y: cy
                });

                if (level._isImpassable(six, cy))
                    return false;
            }
        } else if (siy == eiy) {
            for (let cx = six + 1; cx <= eix; cx++) {
                if (this.game.debug.enabled) this.visited.push({
                    x: cx,
                    y: siy
                });

                if (level._isImpassable(cx, siy))
                    return false;
            }
        } else {
            let uy = Math.floor(((start.origin.y - end.origin.y) / (start.origin.x - end.origin.x)) * scale);
            let y = start.origin.y + (start.height / 2);
            let ny = y + uy;
            let ciy, miy, niy;

            for (let cx = six; cx <= eix; cx++) {
                ciy = Math.floor(y / scale);
                miy = (ny - (ny % scale)) / scale;
                niy = Math.floor(ny / scale);

                if (uy >= 0) {
                    for (let cy = ciy; cy <= niy; cy++) {
                        if (cy <= miy) {
                            if (this.game.debug.enabled) this.visited.push({
                                x: cx,
                                y: cy
                            });

                            if (level._isImpassable(cx, cy)) return false;
                        }

                        if (cy >= miy) {
                            if (this.game.debug.enabled) this.visited.push({
                                x: cx + 1,
                                y: cy
                            });

                            if (level._isImpassable(cx + 1, cy)) return false;
                        }
                    }
                } else {
                    for (let cy = ciy; cy >= niy; cy--) {
                        if (cy <= miy) {
                            if (this.game.debug.enabled) this.visited.push({
                                x: cx,
                                y: cy
                            });

                            if (level._isImpassable(cx, cy)) return false;
                        }

                        if (cy >= miy) {
                            if (this.game.debug.enabled) this.visited.push({
                                x: cx + 1,
                                y: cy
                            });

                            if (level._isImpassable(cx + 1, cy)) return false;
                        }
                    }
                }

                y = ny;
                ny = y + uy;
            }
        }

        return true;
    }

    draw(ctx) {
        super.draw(ctx);

        if (this.game.debug.enabled && this.visited.length > 0) {
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