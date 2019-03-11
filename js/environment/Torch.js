import Entity from '../Entity.js';
import Animation from '../Animation.js'

class Torch extends Entity {
    constructor(game, x, y) {
        super(game, x, y, false);
        this.flameAnimation = new Animation(this.game.assetManager.getAsset('map.torch'), 0, 0, 48, 48, 0.1, 4, true);
    }

    draw(ctx) {
        if (this.game.camera.isAreaInView(this.x, this.y, this.flameAnimation.frameWidth, this.flameAnimation.frameHeight)) {
            this.flameAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }
    }
}

export default Torch;