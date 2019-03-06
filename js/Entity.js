class Entity {
    constructor(game, x, y, genAABB = true) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.destroyed = false;
        if (genAABB) this.boundingBox = new BoundingBox(this.x, this.y, 99, 99); // 99 is default width and height.
    }

    update() {
        if (this.boundingBox) {
            this.boundingBox.setPos(this.x, this.y);
        }
    }

    draw() {
        if (this.game.debug) {
            if (this.boundingBox) {
                this.boundingBox.draw(this.game.ctx);
            }
        }
    }

    destroy() {
        this.destroyed = true;
    }
}

class LivingEntity extends Entity {
    constructor(game, x, y, genAABB = true) {
        super(game, x, y, genAABB);
        this.invulnerable = false;
        this.alive = true;
        this.health = Number.POSITIVE_INFINITY;
    }

    damage(amount) {
        this.health = Math.max(this.health - amount, 0);
    }
}