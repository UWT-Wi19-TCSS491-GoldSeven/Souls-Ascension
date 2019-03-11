import Entity from './Entity.js';

class LivingEntity extends Entity {
    constructor(game, x, y, direction = 'down') {
        super(game, x, y);
        this.invulnerable = false;
        this.alive = true;
        this.health = Number.POSITIVE_INFINITY;
        this.direction = direction;
    }

    damage(amount) {
        this.health = Math.max(this.health - amount, 0);
    }

    draw(ctx) {
        super.draw(ctx);
    }

    updatePosition(collider = this.boundingBox) {
        super.updatePosition(collider);

        if (this.xMot < 0) this.direction = 'left';
        else if (this.xMot > 0) this.direction = 'right';
        else if (this.yMot < 0) this.direction = 'up';
        else if (this.yMot > 0) this.direction = 'down';
    }
}

export default LivingEntity;