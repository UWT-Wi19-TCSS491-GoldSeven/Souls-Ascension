import Animation from '../Animation.js';
import BoundingBox from '../BoundingBox.js';
import Entity from '../Entity.js';

class SilverKey extends Entity {
    constructor(game, x, y) {
        super(game, x, y);
        this.boundingBox = new BoundingBox(x, y, 10, 10, 20, 20);
        this.silverKeyAnimation = new Animation(game.assetManager.getAsset('item.silver.key'), 0, 0, 48, 48, 0.1, 4, true);
    }

    update() {
        super.update();

        let player = this.game.levelManager.level.getEntityWithTag('Player');

        if (this.boundingBox.hasCollided(player.boundingBox)) {
            this.destroy();
            player.inventory.SilverKey += 1;
        }
    }

    draw(ctx) {
        this.silverKeyAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        super.draw();
    }
}

export default SilverKey;