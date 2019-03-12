import Animation from '../Animation.js';
import HostileEntity from '../HostileEnemy.js';
import BoundingBox from '../BoundingBox.js';
import Entity from '../Entity.js';

class SlimeBehemoth extends HostileEntity {
    constructor(game, x, y) {
        super(game, x, y);
        this.boundingBox = new BoundingBox(x, y, 40, 60, 10, 5);
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
        this.startAttackRange = 20;
        this.stopAttackRange = 250;
        this.startFollowRange = 100;
        this.stopFollowRange = 200;
        this.maxHealth = 150;
        this.health = 150;
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