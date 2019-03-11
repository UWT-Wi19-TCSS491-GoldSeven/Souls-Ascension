import HostileEntity from '../HostileEnemy.js';
import BoundingBox from '../BoundingBox.js';
import Animation from '../Animation.js';

class Wraith extends HostileEntity {
    constructor(game, x, y) {
        super(game, x, y);
        this.boundingBox = new BoundingBox(x, y, 30, 50, 25, 15);
        this.animIdle = new Animation(this.game.assetManager.getAsset('wraith.idle'), 0, 0, 80, 80, 0.1, 10, true, false);
        this.animWalkLeft = new Animation(this.game.assetManager.getAsset('wraith.walk.left'), 0, 0, 80, 80, 0.1, 6, true, false);
        this.animWalkRight = new Animation(this.game.assetManager.getAsset('wraith.walk.right'), 0, 0, 80, 80, 0.1, 6, true, false);
        this.animAttackLeft = new Animation(this.game.assetManager.getAsset('wraith.attack.left'), 0, 0, 80, 80, 0.1, 6, true, false);
        this.animAttackRight = new Animation(this.game.assetManager.getAsset('wraith.attack.right'), 0, 0, 80, 80, 0.1, 6, true, false);
        this.animDeath = new Animation(this.game.assetManager.getAsset('wraith.animDeath'), 0, 0, 80, 80, 0.1, 10, false, false);
        this.animation = this.animWalkLeft;
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
            if (this.animDeath && this.animation == this.animDeath) {
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
        if (this.animation !== this.animDeath) {
            if (this.isMovingWest) {
                this.animation = this.animWalkLeft;
            } else {
                this.animation = this.animWalkRight;
            }
        }

        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);

        if (this.animation === this.animDeath) {
            this.life -= this.game.clockTick;
            if (this.life <= 0) this.destroyed = true;
        }

        super.draw(ctx);
    }
}

export default Wraith;