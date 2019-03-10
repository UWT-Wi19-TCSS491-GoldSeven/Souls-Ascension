import HostileEntity from "../HostileEnemy.js";
import BoundingBox from "../BoundingBox.js";
import Animation from "../Animation.js";

class Skeleton extends HostileEntity {
    constructor(game, x, y) {
        super(game, x, y);
        this.boundingBox = new BoundingBox(x, y, 30, 50, 10, 15);
        this.skeletonWalkingLeftAnimation = new Animation(this.game.assetManager.getAsset("./assets/sprites/SkeletonWalkLeft.png"), 0, 0, 44, 66, 0.1, 13, true, false);
        this.skeletonWalkingRightAnimation = new Animation(this.game.assetManager.getAsset("./assets/sprites/SkeletonWalkRight.png"), 0, 0, 44, 66, 0.1, 13, true, false);
        this.death = null;
        this.animation = this.skeletonWalkingRightAnimation;
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
            if (this.death && this.animation == this.death) {
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
            this.animation = this.skeletonWalkingLeftAnimation;
        } else {
            this.animation = this.skeletonWalkingRightAnimation;
        }

        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);

        super.draw(ctx);
    }
}

export default Skeleton;