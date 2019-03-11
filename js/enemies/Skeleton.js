import HostileEntity from '../HostileEnemy.js';
import BoundingBox from '../BoundingBox.js';
import Animation from '../Animation.js';

class Skeleton extends HostileEntity {
    constructor(game, x, y) {
        super(game, x, y);
        this.boundingBox = new BoundingBox(x, y, 30, 50, 10, 15);
        this.animWalkLeft = new Animation(this.game.assetManager.getAsset('skeleton.walk.left'), 0, 0, 44, 66, 0.1, 13, true, false);
        this.animWalkRight = new Animation(this.game.assetManager.getAsset('skeleton.walk.right'), 0, 0, 44, 66, 0.1, 13, true, false);
        this.animDeath = null;
        this.animation = this.animWalkRight;
        this.isMovingWest = true;
        this.isMovingEast = false;
        this.moveSpeed = 30;
        this.attackSpeed = 3;
        this.attackInterval = 0.6;
        this.startAttackRange = 80;
        this.stopAttackRange = 300;
        this.startFollowRange = 150;
        this.stopFollowRange = 350;
        this.maxHealth = 60;
        this.health = 60;
    }

    update() {
        if (!this.alive) {
            if (this.animDeath && this.animation == this.animDeath) {
                this.life -= this.game.clockTick;
                if (this.life <= 0) this.destroyed = true;
            } else {
                this.destroyed = true;
            }

            return;
        }

        if (this.x < 2550 && this.isMovingWest) {
            this.isMovingEast = true;
            this.isMovingWest = false;
            this.x += this.game.clockTick * this.moveSpeed;
        }
        if (this.x > 3380 && this.isMovingEast) {
            this.isMovingEast = false;
            this.isMovingWest = true;
            this.x -= this.game.clockTick * this.moveSpeed;
        }
        if (this.isMovingEast) {
            this.x += this.game.clockTick * this.moveSpeed;
        }
        if (this.isMovingWest) {
            this.x -= this.game.clockTick * this.moveSpeed;
        }

        super.update();
    }

    draw(ctx) {
        if (this.isMovingWest) {
            this.animation = this.animWalkLeft;
        } else {
            this.animation = this.animWalkRight;
        }

        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);

        super.draw(ctx);
    }
}

export default Skeleton;