import Entity from '../Entity.js';
import BoundingBox from '../BoundingBox.js';

class Projectile extends Entity {
    constructor(game, parent, x, y, xs, ys, damage) {
        super(game, x, y);
        this.parent = parent;
        this.xs = xs;
        this.ys = ys;
        this.scale = 4;
        this.life = 100;
        this.damage = damage;
        this.boundingBox = new BoundingBox(this.x, this.y, this.scale * 2, this.scale * 2, -this.scale / 2, -this.scale / 2);
    }

    update() {
        super.update();

        this.xMot = this.xs;
        this.yMot = this.ys;

        this.updatePosition();

        if (this.collidedWithWall()) {
            this.destroy();
            return;
        }

        let player = this.game.level.getEntityWithTag('Player');

        if (player) {
            if (this.boundingBox.hasCollided(player.boundingBox)) {
                this.destroy();
                player.damage(this.damage);
                return
            }
        }

        this.life -= this.game.clockTick;
        if (this.life <= 0) this.destroy();
    }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.scale, 0, 2 * Math.PI);
        ctx.fillStyle = `rgb(253,208,157)`;
        ctx.fill();
        ctx.restore()

        super.draw(ctx);
    }
}

export default Projectile;