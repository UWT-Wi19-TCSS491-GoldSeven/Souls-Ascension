import Entity from './Entity.js';

class LivingEntity extends Entity {
    constructor(game, x, y) {
        super(game, x, y);
        this.invulnerable = false;
        this.alive = true;
        this.health = Number.POSITIVE_INFINITY;
    }

    damage(amount) {
        this.health = Math.max(this.health - amount, 0);
    }

    draw(ctx) {
        super.draw(ctx);
    }
}

export default LivingEntity;