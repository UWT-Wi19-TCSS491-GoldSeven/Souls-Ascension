import HostileEntity from '../HostileEnemy.js';
import BoundingBox from '../BoundingBox.js';
import Animation from '../Animation.js';

class Wraith extends HostileEntity {
    constructor(game, x, y) {
        super(game, x, y);
        this.boundingBox = new BoundingBox(x, y, 30, 50, 25, 15);
        this.wizardWalkingLeftAnimation = new Animation(this.game.assetManager.getAsset('./assets/sprites/wizardWalkLeft.png'), 0, 0, 80, 80, 0.1, 6, true, false);
        this.wizardWalkingRightAnimation = new Animation(this.game.assetManager.getAsset('./assets/sprites/wizardWalkRight.png'), 0, 0, 80, 80, 0.1, 6, true, false);
        this.wizardAttackLeftAnimation = new Animation(this.game.assetManager.getAsset('./assets/sprites/wizardAttackLeft.png'), 0, 0, 80, 80, 0.1, 6, true, false);
        this.wizardAttackRightAnimation = new Animation(this.game.assetManager.getAsset('./assets/sprites/wizardAttackRight.png'), 0, 0, 80, 80, 0.1, 6, true, false);
        this.wizardIdleAnimation = new Animation(this.game.assetManager.getAsset('./assets/sprites/wizardIdle.png'), 0, 0, 80, 80, 0.1, 10, true, false);
        this.death = new Animation(this.game.assetManager.getAsset('./assets/sprites/wizardDeath.png'), 0, 0, 80, 80, 0.1, 10, false, false);
        this.animation = this.wizardWalkingLeftAnimation;
        this.isMovingWest = false;
        this.isMovingEast = true;
        this.moveSpeed = 140;
        this.attackSpeed = 3;
        this.attackInterval = 0.6;
        this.startAttackRange = 80;
        this.stopAttackRange = 300;
        this.startFollowRange = 150;
        this.stopFollowRange = 350;
        this.maxHealth = 60;
        this.health = 60;
        this.life = 1;
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

        if (this.x < 1050 && this.isMovingWest) {
            this.isMovingEast = true;
            this.isMovingWest = false;
            this.x += this.game.clockTick * this.moveSpeed;
        }
        if (this.x > 1970 && this.isMovingEast) {
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
        if (this.animation !== this.death) {
            if (this.isMovingWest) {
                this.animation = this.wizardWalkingLeftAnimation;
            } else {
                this.animation = this.wizardWalkingRightAnimation;
            }
        }

        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);

        if (this.animation === this.death) {
            this.life -= this.game.clockTick;
            if (this.life <= 0) this.destroyed = true;
        }

        super.draw(ctx);
    }
}

export default Wraith;