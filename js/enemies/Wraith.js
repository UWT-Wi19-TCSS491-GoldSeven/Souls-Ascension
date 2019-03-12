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
        this.startAttackRange = 20;
        this.stopAttackRange = 250;
        this.startFollowRange = 100;
        this.stopFollowRange = 200;
        this.maxHealth = 60;
        this.health = 60;
        this.life = 1;
    }

    update() {
        super.update();

        if (!this.alive) {
            if (this.animDeath && this.animation == this.animDeath) {
                this.life -= this.game.clockTick;
                if (this.life <= 0) this.destroyed = true;
            } else {
                this.destroyed = true;
            }

            return;
        }

        let player = this.game.level.getEntityWithTag('Player');

        if (player) {
            if (this.cooldown > 0) this.cooldown = Math.max(this.cooldown - this.game.clockTick, 0);
            let xOrigC = (player.x + player.animation.frameWidth / 2);
            let yOrigC = (player.y + player.animation.frameHeight / 2);
            let xOrigS = this.boundingBox.origin.x;
            let yOrigS = this.boundingBox.origin.y;
            let xDiff = xOrigC - xOrigS;
            let yDiff = yOrigC - yOrigS;
            let distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

            if (distance > this.detectRange || !this.checkSight(player.boundingBox)) {
                return;
            }

            if (this.startFollowRange <= distance && distance <= this.stopFollowRange) {
                this.xMot = this.game.clockTick * (this.moveSpeed * xDiff) / distance;
                this.yMot = this.game.clockTick * (this.moveSpeed * yDiff) / distance;
            }
        }

        this.updatePosition(this.boundingBox);
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