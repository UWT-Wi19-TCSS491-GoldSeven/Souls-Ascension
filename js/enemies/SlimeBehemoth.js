import Animation from '../Animation.js';
import HostileEntity from '../HostileEnemy.js';
import BoundingBox from '../BoundingBox.js';
import Entity from '../Entity.js';

class SlimeBehemoth extends HostileEntity {
    constructor(game, x, y) {
        super(game, x, y);
        this.boundingBox = new BoundingBox(x, y, 40, 60, 20, 5);
        this.animWalkLeft = new Animation(this.game.assetManager.getAsset('behemoth.walk.left'), 0, 0, 80, 68, 0.1, 8, true, false);
        this.animWalkRight = new Animation(this.game.assetManager.getAsset('behemoth.walk.right'), 0, 0, 80, 68, 0.1, 8, true, false);
        this.animAttackLeft = new Animation(this.game.assetManager.getAsset('behemoth.attack.left'), 0, 0, 117, 68, 0.1, 8, true, false);
        this.animAttackRight = new Animation(this.game.assetManager.getAsset('behemoth.attack.right'), 0, 0, 120, 68, 0.1, 8, true, false);
        this.animDeath = null;
        this.animation = this.animWalkRight;
        this.isMovingWest = true;
        this.isMovingEast = false;
        this.moveSpeed = 70;
        this.attackSpeed = 3;
        this.attackInterval = 0.6;
        this.startAttackRange = 80;
        this.stopAttackRange = 300;
        this.startFollowRange = 150;
        this.stopFollowRange = 350;
        this.maxHealth = 150;
        this.health = 150;
    }

    update() {
        let player = this.game.levelManager.level.getEntityWithTag('Player');

        let xOrigC = (player.x + player.animation.frameWidth / 2);
        let yOrigC = (player.y + player.animation.frameHeight / 2);
        let xOrigS = (this.x + this.animation.frameWidth / 2)
        let yOrigS = (this.y + this.animation.frameHeight / 2)
        let xDiff = xOrigC - xOrigS;
        let yDiff = yOrigC - yOrigS;
        let distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

        if (!this.alive) {
            if (this.animDeath && this.animation == this.animDeath) {
                this.life -= this.game.clockTick;
                if (this.life <= 0) this.destroyed = true;
            } else {
                this.destroyed = true;
            }

            return;
        }

        if (this.x < 230 && this.isMovingWest) {
            this.isMovingEast = true;
            this.isMovingWest = false;
            this.x += this.game.clockTick * this.moveSpeed;
        }
        if (this.x > 1210 && this.isMovingEast) {
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

export default SlimeBehemoth;