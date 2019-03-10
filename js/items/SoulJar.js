import Entity from "../Entity.js";
import BoundingBox from "../BoundingBox.js";
import Animation from "../Animation.js";

class SoulJar extends Entity {
    constructor(game, x, y) {
        super(game, x, y);
        this.boundingBox = new BoundingBox(x, y, 10, 10, 20, 20);
        this.sparkleAnimation = new Animation(game.assetManager.getAsset("./assets/sprites/SoulJarAnimation.png"), 0, 0, 48, 48, 0.1, 4, true);
        this.jar = 100;
    }

    update() {
        super.update();

        let player = this.game.levelManager.level.getEntityWithTag("Player");

        if (this.boundingBox.hasCollided(player.boundingBox)) {
            this.destroy();
            player.currentSoul += this.jar;
        }
    }

    draw() {
        this.sparkleAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        super.draw();
    }
}

export default SoulJar;