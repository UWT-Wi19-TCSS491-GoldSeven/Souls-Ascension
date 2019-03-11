import Entity from '../Entity.js';
import BoundingBox from '../BoundingBox.js';
import Animation from '../Animation.js';

class HealingPotion extends Entity {
    constructor(game, x, y) {
        super(game, x, y);
        this.boundingBox = new BoundingBox(x, y, 10, 10, 20, 20);
        this.sparkleAnimation = new Animation(game.assetManager.getAsset('item.hp'), 0, 0, 48, 48, 0.1, 4, true);
    }

    update() {
        super.update();

        let player = this.game.levelManager.level.getEntityWithTag('Player');

        if (this.boundingBox.hasCollided(player.boundingBox)) {
            this.destroy();
            player.inventory.HealingPotion += 1;
        }
    }

    draw(ctx) {
        this.sparkleAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        super.draw();
    }
}

export default HealingPotion;