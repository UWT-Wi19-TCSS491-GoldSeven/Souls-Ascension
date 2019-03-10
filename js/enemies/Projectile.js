import Entity from "../Entity.js";
import BoundingBox from "../BoundingBox.js";

class Projectile extends Entity {
    constructor(game, x, y, xs, ys) {
        super(game, x, y);
        this.xs = xs;
        this.ys = ys;
        this.scale = 4;
        this.life = 10;
        this.boundingBox = new BoundingBox(this.x, this.y, this.scale * 2, this.scale * 2, -this.scale, -this.scale);
    }

    update() {
        let player = this.game.levelManager.level.getEntityWithTag("Player");

        if (this.game.levelManager.level.hasCollidedWithWalls(this)) {
            this.destroy();
            return;
        }

        if (this.boundingBox.hasCollided(player.boundingBox)) {
            this.destroy();
            player.damage(5);
        }

        this.x += this.xs;
        this.y += this.ys;
        this.life -= this.game.clockTick;
        if (this.life <= 0) this.destroyed = true;

        super.update();
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