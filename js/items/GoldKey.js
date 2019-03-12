import Entity from '../Entity.js';
import BoundingBox from '../BoundingBox.js';
import Animation from '../Animation.js';

class GoldKey extends Entity {
    constructor(game, x, y) {
        super(game, x, y);
        this.boundingBox = new BoundingBox(x, y, 10, 10, 10, 10);
        this.goldKeyAnimation = new Animation(game.assetManager.getAsset('item.gold.key'), 0, 0, 48, 48, 0.1, 4, true);
    }

    update() {
        super.update();

        let player = this.game.levelManager.level.getEntityWithTag('Player');

        if (player && this.boundingBox.hasCollided(player.boundingBox)) {
            this.destroy();
            player.inventory.GoldKey += 1;
        }
    }

    draw(ctx) {
        this.goldKeyAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        super.draw(ctx);
    }
}

export default GoldKey;